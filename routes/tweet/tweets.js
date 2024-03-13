const Xprz = require("xprz");
const { Route } = new Xprz();
const { postTweet,getTweets } = $read("controller/tweet/tweets");
const router = new Route();
router.setRoute("/tweets").post(postTweet).get(getTweets)

module.exports = router;
