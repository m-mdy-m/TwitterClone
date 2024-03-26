const Tweet = $read("model/Tweet");
const User = $read("model/User");
// Function to check if a given element's likes array includes a specific ID
function isLikesInclude(element, id) {
  const { likes, likedTweets } = element;
  return (
    (likes && likes.includes(id)) || (likedTweets && likedTweets.includes(id))
  );
}
// Function to check if any element in the array has the specified id in its likes array
function isIdLiked(array = [], id) {
  for (const elm of array) {
    if (isLikesInclude(elm, id)) {
      return true; // If found, return true immediately
    }
  }
  return false; // If not found, return false after checking all elements
}
/**
 * Generate MongoDB queries for associating user with tweet and updating tweet features.
 * @param {string} operation - Operation type ('$addToSet', '$pull', etc.).
 * @param {string} userId - ID of the user.
 * @param {string} tweetId - ID of the tweet.
 * @param {string} featureTypeTweet - Feature type for tweet ('likes' by default).
 * @param {string} featureTypeUser - Feature type for user ('likedTweets' by default).
 * @returns {object} - Object containing query and updateQuery for MongoDB.
 */
const generateTweetQueries = (operation,userId,tweetId,isRetweet,retweetId,featureTypeTweet = "likes", featureTypeUser = "likedTweets") => {
  // Construct query to associate user with tweet based on the operation and tweet information
  let UserQuery = { [operation]: { [featureTypeTweet]: userId } };
  // Construct update query to perform operation on tweet based on tweet information
  const TweetQuery = { [operation]: { [featureTypeUser]: tweetId } };
  if (isRetweet) {
    UserQuery = {
      [operation]: { [featureTypeTweet]: userId, retweets: retweetId },
    };
  }

  return { UserQuery, TweetQuery };
};
/**
 * Clears all cookies present in the request by setting their expiration time to a past date.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
function clearAllCookies(req, res) {
  // Retrieve all cookies from the request
  const cookies = req.cookies;

  // Iterate over each cookie
  for (const cookieName in cookies) {
    // Clear the cookie by setting its expiration time to a past date
    res.clearCookie(cookieName);
  }
}

/**
 * Retrieves the original tweet if the given tweet is a retweet, updates likes accordingly, and invokes a callback.
 * If the tweet is not a retweet, it directly updates the likes on the tweet itself.
 * @param {Object} tweet - The tweet object.
 * @param {string} userId - The ID of the user performing the action.
 * @param {string} option - The operation option ('$addToSet', '$pull', etc.).
 * @param {function} callback - The callback function to be invoked with the updated tweet.
 * @returns {Object} - Object containing the updated user and tweet.
 */
async function handleRetweet(tweet, userId, option,internalServerError) {
  try {
    // Retrieve the ID of the original tweet, if it's a retweet
    const TweetQuery = { [option]: { "likes": userId } };
    
    // Find the parent tweet and all its children
    const parent = await getParentTweet(tweet, TweetQuery);
    const children = await getAllChildren(parent);
    // If the parent tweet has retweets, update likes recursively
    if (parent.retweets && parent.retweets.length > 0) {
      return await updateRetweetLikes(tweet, children, option, userId);
    }
    // If the parent tweet is not a retweet, return it
    return parent;
  } catch (error) {
     // Handle any errors
     console.error("Error getting original tweet:", error);
     internalServerError("Failed to get original tweet.");
  }
}


/**
 * Updates the likes on retweeted tweets and the original tweet based on the provided option.
 * @param {Object} currentTweet - The current tweet object to update likes on.
 * @param {Object[]} children - Array of child tweet objects.
 * @param {string} option - The operation option ('$addToSet', '$pull', etc.).
 * @param {string} userId - The ID of the user performing the action.
 * @returns {Promise<Object>} - A promise that resolves with the updated current tweet and original tweet.
 */
async function updateRetweetLikes(currentTweet, children, option, userId) {
  try {
    // Construct the query for updating likes
    const query = { [option]: { likes: userId } };

    // Update likes on the current tweet
    const updatedCurrentTweet = await Tweet.findByIdAndUpdate(currentTweet._id, query, { new: true });

    // If the current tweet has children, recursively update likes on them
    if (children && children.length > 0) {
      // Update likes on each child tweet
      const childPromises = children.map(async child => {
        // Recursively update likes on the child tweet
        return updateRetweetLikes(child, null, option, userId);
      });

      // Wait for all child likes to be updated
      await Promise.all(childPromises);
    }

    // Return the updated current tweet
    return updatedCurrentTweet;
  } catch (error) {
    // Handle any errors
    console.error("Error updating retweet likes:", error);
    throw new Error("Failed to update retweet likes.");
  }
}
/**
 * Recursively retrieves the parent tweet of a given tweet, updating likes accordingly.
 * If the given tweet is already the original tweet, updates likes directly.
 * @param {Object} tweet - The tweet object or its ID.
 * @param {Object} query - The update query for updating likes.
 * @returns {Object} - The updated parent tweet.
 */
async function getParentTweet(tweet, query) {
  // Determine the ID of the original tweet
  const originalTweetId = tweet.originalTweet ?? tweet;

  // Update the original tweet with the provided query to track likes
  const updatedTweet = await Tweet.findByIdAndUpdate(originalTweetId._id, query, { new: true });

  // If the original tweet still exists, recursively find its parent tweet
  if (updatedTweet.originalTweet) {
    return await getParentTweet(updatedTweet, query);
  }

  // Return the updated parent tweet
  return updatedTweet;
}

/**
 * Recursively retrieves all children tweets of a parent tweet.
 * @param {Object} parentTweet - The parent tweet object.
 * @returns {Array} - Array containing all children tweets.
 */
async function getAllChildren(parentTweet) {
  try {
    const children = [];

    // Recursive function to find children of a tweet
    async function findChildren(tweet) {
      // Find all tweets with the current tweet as the original tweet
      const childTweets = await Tweet.find({ originalTweet: tweet._id });

      // Iterate over child tweets and add them to the children array
      for (const child of childTweets) {
        children.push(child);
        // Recursively find children of the current child tweet
        await findChildren(child);
      }
    }

    // Start searching for children from the parent tweet
    await findChildren(parentTweet);

    // Return the array containing all children tweets
    return children;
  } catch (error) {
    console.error("Error getting children tweets:", error);
    throw new Error("Failed to get children tweets.");
  }
}

async function foundTweetAndUser(req, getJsonHandler) {
  const { badRequest, authRequired, notFound,internalServerError } = getJsonHandler();

  try {
    const tweetId = req.param('id');

    // Check if the tweet ID is missing
    if (!tweetId) {
      return badRequest("Invalid request. Please provide a valid tweet ID.");
    }

    const user = req.user;

    // Check if the user is authenticated
    if (!user) {
      return authRequired("Authentication required. Please log in to perform this action.");
    }

    // Fetch the tweet and the current user asynchronously
    const [tweet, currentUser] = await Promise.all([
      Tweet.findById(tweetId),
      User.findById(user.userId)
    ]);

    // Check if both tweet and current user exist
    if (!tweet || !currentUser) {
      return notFound("Tweet or user not found.");
    }

    // Return the found tweet and current user
    return { tweet, currentUser };
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in foundTweetAndUser function:", error);
    return internalServerError("Internal server error. Please try again later.");
  }
}

module.exports = {
  isIdLiked,
  isLikesInclude,
  generateTweetQueries,
  clearAllCookies,
  handleRetweet,
  getParentTweet,
  foundTweetAndUser
};
