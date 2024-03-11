const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post((req, res) => {
  const body = req.body;
  const csrfToken = req.csrfToken();
  const clientCsrfToken = req.headers["x-csrf-token"];
  if (csrfToken === clientCsrfToken) {
    console.log("CSRF token is valid");
  } else {
    console.log("CSRF token is invalid or missing");
  }
});

module.exports = router;
