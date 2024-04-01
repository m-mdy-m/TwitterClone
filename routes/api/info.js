const route = require("xprz").Route();
const { verifyToken } = $read("middleware/is-auth");
const { findUser,findTweet } = $read("controller/info/info");
// Defining a GET route for fetching tweets
route.route('/user-info').mid([verifyToken]).get(findUser);
route.route("/tweet-info/:id").mid([verifyToken]).get(findTweet);
module.exports = route;