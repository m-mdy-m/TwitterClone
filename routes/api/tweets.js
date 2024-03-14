const Xprz = require("xprz");
const { Route } = new Xprz();
const { postTweet, getTweets } = $read("controller/tweet/tweets");
const router = new Route();
router.group("/api", (r) => {
  r.setRoute("/create").post(postTweet);
  r.setRoute("/tweets").get(getTweets);
});
module.exports = router;
