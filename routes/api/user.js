const route = require("xprz").Route();
const { verifyToken } = $read("middleware/is-auth");
const { findUser } = $read("controller/users/user");
// Defining a GET route for fetching tweets
route.route("/user-info").using([verifyToken]).get(findUser);
module.exports = route;
