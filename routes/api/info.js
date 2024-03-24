const route = require("xprz").Route();
const { verifyToken } = $read("middleware/is-auth");
const { findUser,findTweet } = $read("controller/info/info");
// Defining a GET route for fetching tweets
route.route("/user-info").using([verifyToken]).get(findUser);
route.route("/tweet-info/:id").using([verifyToken]).get(findTweet);
module.exports = route;
