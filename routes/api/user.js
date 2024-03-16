const Xprz = require("xprz");
const { Route } = new Xprz();
const { findUser } = $read("controller/users/user");
const router = new Route();
// Grouping API routes under the "/api" prefix
router.group("/api", (r) => {
  // Defining a GET route for fetching tweets
  r.setRoute("/user/:username").get(findUser);
});
module.exports = router;
