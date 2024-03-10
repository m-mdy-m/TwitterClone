const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post(() => {
  const { getBody, getReq } = router.req();
  const body = getBody();
  const req = getReq();
  console.log("req : ", req);
  const csrfToken = req.csrfToken();
  const clientCsrfToken  = req.headers["X-CSRF-Token"];
  if (csrfToken === clientCsrfToken) {
    console.log("CSRF token is valid");
  } else {
    console.log("CSRF token is invalid or missing");
  }
});

module.exports = router;
