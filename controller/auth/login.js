const Xprz = require("xprz");

const { Package } = new Xprz();
const { bcryptjs } = new Package();
const User = $read("model/User");
exports.getLogin = (req, res) => {
  const { status } = res;
  status(200).render("auth/login.ejs", {
    Title: "Login",
    oldValue: {
      username: null,
      email: null,
      password: null,
      passwordConf: null,
    },
  });
};
/**
 *  username : Ads242sxz
 * email : mahdimamashli1383@gmail.com
 * password : Asd24242@4
 */
exports.postLogin = async (req, res) => {
  const { getReq, getBody } = req;
  const { getJsonHandler, status } = res;
  const { created } = getJsonHandler();
  const request = getReq();
  const body = getBody();
  const username = body.username;
  const email = body.email;
  const password = body.password;
  const user = await User.findOne({ username: username, email: email });
  if (!user) {
    return res.status(200).json({
      success: false,
      message: "User not found. Please login or register.",
    });
  }
  const isCurrentUser = user._id.toString() === request.user._id.toString();
  if (!isCurrentUser) {
    return res.status(200).json({
      success: false,
      message: "You are not authorized to perform this action.",
    });
  }

  const passwordMatches = await bcryptjs().compare(password, user.password);
  if (!passwordMatches) {
    return res.status(200).json({
      success: false,
      message: "Incorrect password. Please try again.",
    });
  }
  req.session.user = user;

  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
  });
};
