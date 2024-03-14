const { isPassword, isEmail, isUsername } = require("vfyjs");
const Xprz = require("xprz");
const path = require("path");
const { Package } = new Xprz();
const { bcryptjs } = new Package();
const User = $read("model/User");
// Controller function to render the signup page
exports.getSignup = (req, { sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/views/auth/signup.html"));
};
// Controller function to handle signup form submission
exports.postSignup = async (req, { getJsonHandler, status }) => {
  const { getBody } = req;
  const { created, validationFailed, internalServerError } = getJsonHandler();
  const body = getBody();
  try {
    // Extract user input from request body
    const { username, email, password, passwordConf } = body;
    // Validate user input
    if (!isUsername(username) || !isEmail(email) || !isPassword(password) || password !== passwordConf) {
      return validationFailed({ message: 'Invalid input. Please check your username, email, and password.' });
    }
    
      // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return status(409).json({ success: false, message: 'User already exists.' });
    } else {
        // Hash the password securely
        const hashedPassword = await bcryptjs().hash(password, 10);
        const newUser  = await User.create({
          username: username,
          email: email,
          password: hashedPassword,
        });
        req.session.user = newUser ;
        // Send success response
        return created(newUser);
      }
    
  } catch (error) {
    // Handle other errors (e.g., database error)
    internalServerError(error.message);
  }
};
