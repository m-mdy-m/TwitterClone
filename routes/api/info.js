const {route, expose} = require("xprz").Route();
const { verifyToken } = $read("middleware/is-auth");
const { findUser,findTweet } = $read("controller/info/info");
// Defining a GET route for fetching tweets
route('/user-info').mid([verifyToken]).get(findUser);
route("/tweet-info/:id").mid([verifyToken]).get(findTweet);
module.exports = expose;