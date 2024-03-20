const Xprz = require("xprz");
const { Route } = new Xprz();
const { verifyToken } = $read("middleware/is-auth");
const { findUser } = $read("controller/users/user");
const router = new Route();
// Defining a GET route for fetching tweets
router.route("/user-info").using([verifyToken]).get(findUser);
module.exports = router;
