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
// password  : A242sxcz@
// username : m-mdy-mA2
// email : mahdimamashli1383@gmail.com
exports.postLogin = async (req, res) => {
  const { getReq, getBody } = req;
  const { getJsonHandler, status } = res;
  const {} = getJsonHandler();
  const request = getReq();
  const body = getBody();
  const username = body.username;
  const email = body.email;
  const password = body.password;
  const user = await User.findOne({ username: username, email: email });
  const isUser = user._id.toString() === request.user._id.toString();
  if (!isUser) {
    // If user exists, send user information to the client
    return status(200).json({
      success: false,
      message: "User is no login",
    });
  }
  const hashedPassword = await bcryptjs().compare();
};
