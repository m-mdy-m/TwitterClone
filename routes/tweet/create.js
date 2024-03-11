const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post((req,res) => {
  const {} = router.res();
  const { getReq } = router.req();
  const request = getReq();
});

module.exports = router;
