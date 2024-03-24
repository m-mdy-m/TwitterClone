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
async function handleRetweet(tweet, userId, option) {
  try {
    const TweetQuery = { [option]: { "likes": userId } };
    const parent = await getParentTweet(tweet,TweetQuery)
    const children = await getAllChildren(parent);
    if (children) {
      await updateRetweetLikes(children,parent, option, userId);
    }
    return parent
  } catch (error) {
    // Handle any errors
    console.error("Error getting original tweet:", error);
    throw new Error("Failed to get original tweet.");
  }
}


async function getParentTweet(tweet,query){
  const originalTweetId = tweet.originalTweet ??tweet ;
    // Update the original tweet with the user's ID (for tracking likes on original tweet)
    const updatedTweet = await Tweet.findByIdAndUpdate(originalTweetId._id, query, { new: true });

    // If the original tweet still exists, recursively invoke handleRetweet
    if (updatedTweet.originalTweet) {
      return await getParentTweet(updatedTweet, query);
    }
  return updatedTweet
}

async function getAllChildren(parentTweet) {
  try {
    const children = [];

    // Recursive function to find children of a tweet
    async function findChildren(tweet) {
      const childTweets = await Tweet.find({ originalTweet: tweet._id });

      for (const child of childTweets) {
        children.push(child);
        await findChildren(child);
      }
    }

    // Start searching for children from the parent tweet
    await findChildren(parentTweet);

    return children;
  } catch (error) {
    console.error("Error getting children tweets:", error);
    throw new Error("Failed to get children tweets.");
  }
}

/**
 * Updates the likes on retweeted tweets and the original tweet based on the provided option.
 * @param {Object} originalTweet - The original tweet object.
 * @param {string} option - The operation option ('$addToSet', '$pull', etc.).
 * @param {string} userId - The ID of the user liking the tweet.
 * @returns {Promise<void>} - A promise that resolves once the likes are updated.
 */
async function updateRetweetLikes(children,parent, option, userId) {
  try {
    const query = { [option]: { likes: userId } };
    const retweetPromises = [];
    for (const child of children) {
      const retweetIds = child.retweets
     // Iterate over retweet IDs of the child tweet
     for (const retweetId of retweetIds) {
      // Find the retweeted tweet
      const retweetedTweet = await Tweet.findById(retweetId);

      // Check if the retweeted tweet corresponds to the parent tweet
      if (retweetedTweet.originalTweet.toString() === parent._id.toString()) {
        // Update likes on the retweeted tweet
        retweetPromises.push(Tweet.findByIdAndUpdate(retweetId, query, { new: true }));
        // Also update likes on the parent tweet
        retweetPromises.push(Tweet.findByIdAndUpdate(parent._id, query, { new: true }));
      }
    }
    }
    // Update likes on the retweeted tweets and the child tweets
    const [updatedRetweets, updatedChildren] = await Promise.all(retweetPromises);
      
    // If there are still retweeted tweets, recursively call updateRetweetLikes
    if (updatedRetweets && updatedRetweets.retweets && updatedRetweets.retweets.length > 0) {
      await updateRetweetLikes(updatedChildren, option, userId);
    }
    
    return { updatedRetweets, updatedChildren };
  } catch (error) {
    // Handle any errors
    console.error("Error updating retweet likes:", error);
    throw new Error("Failed to update retweet likes.");
  }
}
module.exports = {
  isIdLiked,
  isLikesInclude,
  generateTweetQueries,
  clearAllCookies,
  handleRetweet,
  getParentTweet,
};
