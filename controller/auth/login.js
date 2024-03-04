const Xprz = require("xprz");

const { Package } = new Xprz();
const { bcryptjs } = new Package();
const User = $read("model/User");
exports.getLogin = (req, res) => {
  const { status } = res;
  status(200).render("auth/login.ejs", {
    Title: "Login",
  });
};
exports.postLogin = async (req, res) => {
  const { getReq, getBody } = req;
  const { getJsonHandler, status } = res;
  const {} = getJsonHandler();
  const request = getReq();
  const body = getBody();
  const username = body.username;
  const email = body.email;
  const user = await User.findOne({ username: username, email: email });
  if (!user) {
  }
  const password = body.password;
  const hashedPassword = await bcryptjs().compare();
};
