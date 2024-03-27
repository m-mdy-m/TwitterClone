const route = require("xprz").Route();

const { verifyToken } = $read("middleware/is-auth");
const { create, getTweets, likeTweet, retweet,bookmarkTweet,deleteTweet } = $read("controller/api/tweets");
route.globalMiddleware([verifyToken]);
// Grouping API routes under the "/api" prefix
route.group("/api", (r) => {
  // Defining a POST route for creating a new tweet
  r.route("/create").post(create);

  // Defining a GET route for fetching tweets
  r.route("/tweets").get(getTweets);

  // Defining a PUT route for liking a tweet
  r.route("/like/:id").put(likeTweet);
  // Defining a Post route for Retweet a tweet
  r.route("/retweet/:id").post(retweet);
  // Defining a PUt route for bookmark a tweet
  r.route('/bookmark/:id').put(bookmarkTweet)
  // Defining a DELETE route for deleting a tweet
  r.route('/deleteTweet/:id').del(deleteTweet)
});
module.exports = route;