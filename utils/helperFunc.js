// Function to check if a given element's likes array includes a specific id
function isLikesInclude(elm, id) {
  return elm.likes && elm.likes.includes(id.toString());
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
const createQueries = (option, userId, tweetId) => {
  // Query to update tweet's likes based on the option (addToSet for like, pull for unlike)
  const tweetQuery = { [option]: { likes: userId } };

  // Query to update user's likes based on the option (addToSet for like, pull for unlike)
  const userQuery = { [option]: { likes: tweetId } };

  return { tweetQuery, userQuery };
};

module.exports = { isIdLiked, isLikesInclude, createQueries };
