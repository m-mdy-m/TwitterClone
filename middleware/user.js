const User = require("../model/User");
// Middleware function to fetch user data from the database based on session information
module.exports = async (req, res, nxt) => {
    if (req.session.user) {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      nxt();
    }
    req.user = user;
    nxt();
  } else {
    nxt();
  }
};
