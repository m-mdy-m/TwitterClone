const Xprz = require("xprz");
const { verifyToken } = $read("middleware/is-auth");
const { findUser } = $read("controller/users/user");
const router = Xprz.Route()
// Defining a GET route for fetching tweets
router.route("/user-info").using([verifyToken]).get(findUser);
module.exports = router;
