const Xprz = require("xprz");
const { Route } = new Xprz();
const router = new Route();
const csrf = require("csurf");
router
  .setRoute("/tweets")
  .using(csrf({ cookie: true }))
  .post((req, res) => {
    try {
      const csrfToken = req.csrfToken();
      const clientCsrfToken = req.headers["x-csrf-token"];

      if (csrfToken === clientCsrfToken) {
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
