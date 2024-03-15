const Xprz = require("xprz");
const { Route } = new Xprz();
const { postTweet, getTweets,putLike } = $read("controller/tweet/tweets");
const router = new Route();
// Grouping API routes under the "/api" prefix
router.group("/api", (r) => {
  // Defining a POST route for creating a new tweet
  r.setRoute("/create").post(postTweet);

  // Defining a GET route for fetching tweets
  r.setRoute("/tweets").get(getTweets);

  // Defining a PUT route for liking a tweet
  r.setRoute("/like/:id").put(putLike);
});
module.exports = router;
