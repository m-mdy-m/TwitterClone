const route = require('xprz').Route()

const { verifyToken } = $read("middleware/is-auth");
const { postTweet, getTweets, likeTweet, retweet } = $read(
  "controller/tweet/tweets"
);
route.globalMiddleware([verifyToken])
// Grouping API routes under the "/api" prefix
route.group("/api", (r) => {
  // Defining a POST route for creating a new tweet
  r.route("/create").post(postTweet);

  // Defining a GET route for fetching tweets
  r.route("/tweets").get(getTweets);

  // Defining a PUT route for liking a tweet
  r.route("/like/:id").put(likeTweet);
  r.route("/retweet/:id").post(retweet);
});
module.exports = route;
