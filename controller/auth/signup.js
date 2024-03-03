const { isPassword, isEmail, isUsername } = require("vfyjs");
const User = $read("model/User");
exports.getSignup = (req, res) => {
  const { status } = res;
  status(200).render("auth/signup.ejs", {
    Title: "signup",
    oldValue: {
      username: null,
      email: null,
      password: null,
      passwordConf: null,
    },
  });
};
exports.postSignup = async (req, res) => {
  const { getBody } = req;
  const { getJsonHandler, status } = res;
  const { success, validationFailed, internalServerError } = getJsonHandler();
  const body = getBody();
  try {
    const username = body.username;
    const email = body.email;
    const password = body.password;
    const passwordConf = password === body.passwordConf;
    if (
      isUsername(body.username) &&
      isEmail(body.email) &&
      isPassword(body.password) &&
      passwordConf
    ) {
      const user = await User.findOne({ username: username, email: email });
      if (user) {
        // If user exists, send user information to the client
        status(200).json({
          success: false,
          message: "User already exists",
          user,
        });
        return; // Exit from the function
      }
      //   success("Signup successful");
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
    internalServerError("An error occurred while processing your request.");
  }
};
