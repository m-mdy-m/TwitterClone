// Function to check if a given element's likes array includes a specific id
function isLikesInclude(elm, id) {
  return elm.likes && elm.likes.includes(id);
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
 * Generates MongoDB-like queries for operations related to tweets.
 * @param {string} operation - The operation to be performed (e.g., 'find', 'update', 'delete').
 * @param {string} userId - The ID of the user associated with the tweet.
 * @param {string} tweetId - The ID of the tweet.
 * @param {string} [tweetInfo='likes'] - The type of information related to the tweet (default: 'likes').
 * @returns {object} An object containing the generated query and updateQuery.
 */
const generateTweetQueries = (operation, userId, tweetId, featureType = 'likes') => {
  // Constructing query to associate user with tweet based on the operation and tweet information
  const query = { [operation]: { [featureType]: userId } };

  // Constructing update query to perform operation on tweet based on tweet information
  const updateQuery = { [operation]: { [featureType]: tweetId } };

  return { query, updateQuery };
};

module.exports = { isIdLiked, isLikesInclude, generateTweetQueries };
