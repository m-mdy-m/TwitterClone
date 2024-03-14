const { isPassword, isEmail, isUsername } = require("vfyjs");
const Xprz = require("xprz");
const path = require("path");
const { Package } = new Xprz();
const { bcryptjs } = new Package();
const User = $read("model/User");
exports.getSignup = (req, { sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/views/auth/signup.html"));
};
exports.postSignup = async (req, { getJsonHandler, status }) => {
  const { getBody } = req;
  const { created, validationFailed, internalServerError } = getJsonHandler();
  const body = getBody();
  try {
    const username = body.username;
    const email = body.email;
    const password = body.password;
    const hashedPassword = await bcryptjs().hash(password);
    const passwordConf = password === body.passwordConf;
    if (
      isUsername(body.username) &&
      isEmail(body.email) &&
      isPassword(body.password) &&
      passwordConf
    ) {
      let existingUser  = await User.findOne({$or : [{username : username}, {email : email}]});
      if (existingUser ) {
        // If user exists, send user information to the client
        return status(200).json({
          success: false,
          message: "User already exists",
        });
      } else {
        const newUser  = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
        req.session.user = newUser ;
        created(newUser );
      }
    } else {
      // Validation failed
      validationFailed({
        username: body.username,
        email: body.email,
        password: body.password,
        passwordConf: body.passwordConf,
      });
    }
  } catch (error) {
    // Handle other errors (e.g., database error)
    internalServerError(error.message);
  }
};
