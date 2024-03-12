const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post((req, res) => {
  const body = req.getBody();
  const { getJsonHandler} = res
  const {badRequest} = getJsonHandler()
  if (!body.tweet) {
    return badRequest("Tweet content is missing.")
  }
});

module.exports = router;
