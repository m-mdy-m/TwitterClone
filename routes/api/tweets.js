const route = require('xprz').Route()

const { verifyToken } = $read("middleware/is-auth");
const { postTweet, getTweets, likeTweet, retweet } = $read(
  "controller/tweet/tweets"
);
// Grouping API routes under the "/api" prefix
route.group("/api", (r) => {
  // Defining a POST route for creating a new tweet
  r.route("/create").using([verifyToken]).post(postTweet);

  // Defining a GET route for fetching tweets
  r.route("/tweets").using([verifyToken]).get(getTweets);

  // Defining a PUT route for liking a tweet
  r.route("/like/:id").using([verifyToken]).put(likeTweet);
  r.route("/retweet/:id").using([verifyToken]).put(retweet);
});
module.exports = route;
