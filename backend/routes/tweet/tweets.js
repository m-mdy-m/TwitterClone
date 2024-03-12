const Xprz = require("xprz");
const { Route } = new Xprz();
const { postTweet } = $read("backend/controller/tweet/tweets");
const router = new Route();
router.setRoute("/tweets").post(postTweet)

module.exports = router;
