const Xprz = require("xprz");
const path = require("path");

const { Package } = new Xprz();
const { bcryptjs } = new Package();
const User = $read("backend/model/User");
exports.getLogin = (req, { sendFile }) => {
  sendFile(path.join(process.cwd(), "/frontend/html/auth/login.html"));
};
/**
 *  username : Ads242sxz
 * email : mahdimamashli1383@gmail.com
 * password : Asd24242@4
 */
exports.postLogin = async (req, { status }) => {
  const { getBody } = req;
  const body = getBody();
  const username = body.username;
  const email = body.email;
  const password = body.password;
  const user = await User.findOne({ username: username, email: email });
  if (!user) {
    return status(200).json({
      success: false,
      message: "User not found. Please login or register.",
    });
  }
  const passwordMatches = await bcryptjs().compare(password, user.password);
  if (!passwordMatches) {
    return status(200).json({
      success: false,
      message: "Incorrect password. Please try again.",
    });
  }
  req.session.user = user;

  return status(200).json({
    success: true,
    message: "Logged in successfully.",
  });
};
