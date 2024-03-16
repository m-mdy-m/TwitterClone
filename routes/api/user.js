const Xprz = require("xprz");
const { Route } = new Xprz();
const { ensureAuthenticated,verifyToken } = $read("middleware/is-auth")
const { findUser } = $read("controller/users/user");
const router = new Route();
  // Defining a GET route for fetching tweets
router.setRoute("/user-info").using([ensureAuthenticated,verifyToken]).get(findUser);
module.exports = router;
