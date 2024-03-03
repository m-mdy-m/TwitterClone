const User = require("../model/User");
module.exports = async (req, res, nxt) => {
    console.log("req.session.user+>", req.session.user);
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
