const Xprz = require("xprz");
const { Route } = new Xprz();
const { verifyToken } = $read("middleware/is-auth")
const { postTweet, getTweets,likeTweet ,retweet} = $read("controller/tweet/tweets");
const router = new Route();
// Grouping API routes under the "/api" prefix
router.group("/api", (r) => {
  // Defining a POST route for creating a new tweet
  r.setRoute("/create").using([verifyToken]).post(postTweet);

  // Defining a GET route for fetching tweets
  r.setRoute("/tweets").using([verifyToken]).get(getTweets);

  // Defining a PUT route for liking a tweet
  r.setRoute("/like/:id").using([verifyToken]).put(likeTweet);
  r.setRoute('/retweet/:id').using([verifyToken]).put(retweet)
});
module.exports = router;
