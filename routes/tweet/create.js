const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post(() => {
  const { getBody, getReq } = router.req();
  const body = getBody();
  const req = getReq();
  // Retrieve CSRF token from the request headers
  const csrfToken = req.headers["x-csrf-token"];
  // Retrieve CSRF token from the user's session
  const storedCsrfToken = req.session.csrfSecret
    console.log('csrfToken=>',csrfToken);
    console.log('storedCsrfToken=>',storedCsrfToken);
  // Verify CSRF token
  if (csrfToken === storedCsrfToken) {
    // CSRF token is valid, process the request
    console.log("CSRF token is valid");
    console.log("Body of tweets post request:", body);
  } else {
    // CSRF token is invalid or missing, reject the request
    console.log("CSRF token is invalid or missing");
    // Respond with an error status code or message
  }
});

module.exports = router;
