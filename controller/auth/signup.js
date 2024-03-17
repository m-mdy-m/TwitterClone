const { isPassword, isEmail, isUsername } = require("vfyjs");
const Xprz = require("xprz");
const path = require("path");
const generateAuthToken = $read("utils/generateAuthToken");
const { Package } = new Xprz();
const { bcryptjs, jwt } = new Package();
const User = $read("model/User");
// Controller function to render the signup page
exports.getSignup = (req, { sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/views/main.html"));
};
// Controller function to handle signup form submission
exports.postSignup = async (req, { getJsonHandler, status }) => {
  const { getBody } = req;
  const { created, validationFailed, internalServerError } = getJsonHandler();
  try {
    // Extract user input from request body
    const { username, email, password, passwordConf } = getBody();
    // Validate user input
    if (
      !isUsername(username) ||
      !isEmail(email) ||
      !isPassword(password) ||
      password !== passwordConf
    ) {
      return validationFailed({
        message:
          "Invalid input. Please check your username, email, and password.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return status(409).json({
        success: false,
        error: "You are already exists.",
      });
    } else {
      // Hash the password securely
      const hashedPassword = await bcryptjs().hash(password, 10);
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      // Generate JWT token with user information
      const token = generateAuthToken(newUser)
      req.session.token = token;
      // Send success response
      return created({ token });
    }
  } catch (error) {
    // Handle other errors (e.g., database error)
    internalServerError(error.message);
  }
};
