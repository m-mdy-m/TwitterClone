const Xprz = require("xprz");
const { Route } = new Xprz();
const { postTweet } = $read("controller/tweet/create");
const router = new Route();
router.setRoute("/tweets").post(postTweet);

module.exports = router;
