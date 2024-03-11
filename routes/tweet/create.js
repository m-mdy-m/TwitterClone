const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
router.setRoute("/tweets").post((req, res) => {
  try {
    const clientCsrfToken = req.headers["x-csrf-token"];
    console.log('clientCsrfToken : ',clientCsrfToken);

    if (clientCsrfToken) {
      console.log("CSRF token is valid");
      // Proceed with your tweet creation logic here
    } else {
      console.log("CSRF token is invalid or missing");
      // Handle invalid CSRF token error
      res.status(403).send("Invalid CSRF token");
    }
  } catch (error) {
    console.error("Error handling tweet creation:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
