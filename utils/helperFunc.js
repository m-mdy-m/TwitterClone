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
    // Retrieve the ID of the original tweet, if it's a retweet
    const originalTweetId = tweet.originalTweet;

    // If it's not a retweet, update likes directly and return
    if (!originalTweetId) {
      await updateRetweetLikes(tweet, option, userId); // Updating likes directly on the tweet
      return;
    }
    // Find the original tweet
    const originalTweet = await Tweet.findById(originalTweetId);
    // Generate queries for updating user and original tweet based on the operation
    const TweetQuery = { [option]: { "likes": userId } };

    // Update the user's liked posts with the original tweet ID
    // Update the original tweet with the user's ID (for tracking likes on original tweet)
    const updatedTweet = await Tweet.findByIdAndUpdate(originalTweet._id, TweetQuery, { new: true });

    // If the original tweet still exists, recursively invoke handleRetweet
    if (updatedTweet.originalTweet) {
      await handleRetweet(updatedTweet, userId, option);
      return;
    }

    if (updatedTweet.retweets && updatedTweet.retweets.length>0) {
      await updateRetweetLikes(tweet, option, userId); // Updating likes directly on the tweet
      return;
    }
    // Return the updated user and tweet
    return { updatedTweet };
  } catch (error) {
    // Handle any errors
    console.error("Error getting original tweet:", error);
    throw new Error("Failed to get original tweet.");
  }
}


/**
 * Updates the likes on retweeted tweets and the original tweet based on the provided option.
 * @param {Object} originalTweet - The original tweet object.
 * @param {string} option - The operation option ('$addToSet', '$pull', etc.).
 * @param {string} userId - The ID of the user liking the tweet.
 * @returns {Promise<void>} - A promise that resolves once the likes are updated.
 */
async function updateRetweetLikes(originalTweet, option, userId) {
  try {
    // Extract retweet IDs from the original tweet
    const retweetIds = originalTweet.retweets;

    // Construct the query for updating likes
    const query = { [option]: { likes: userId } };

    // Array to hold promises for updating retweeted tweets and the original tweet
    const retweetPromises = [];

    // Iterate over retweet IDs
    for (const retweetId of retweetIds) {
      // Find the retweeted tweet
      const retweetedTweet = await Tweet.findById(retweetId);

      // Check if the retweeted tweet corresponds to the original tweet
      if (retweetedTweet.originalTweet.toString() === originalTweet._id.toString()) {
        // Update likes on the retweeted tweet
        retweetPromises.push(Tweet.findByIdAndUpdate(retweetId, query, { new: true }));
        // Also update likes on the original tweet
        retweetPromises.push(Tweet.findByIdAndUpdate(originalTweet._id, query, { new: true }));
      }
    }

     // Update likes on the retweeted tweets and the original tweet
     const [updatedRetweets, updatedOriginalTweet] = await Promise.all(retweetPromises);

     // If there are still retweeted tweets, recursively call updateRetweetLikes
     if (updatedRetweets && updatedRetweets.retweets && updatedRetweets.retweets.length > 0) {
       await updateRetweetLikes(updatedRetweets, option, userId);
     }
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
};
