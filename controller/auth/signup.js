const { bcryptjs } = require("xprz").Package();
const path = require("path");
const generateAuthToken = $read("utils/generateAuthToken");
const User = $read("model/User");
// Controller function to render the signup page
exports.getSignup = (req, { sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/views/main.html"));
};
// Controller function to handle signup form submission
exports.postSignup = async (req, { getJsonHandler, status }) => {
  const { getBody, verifyBody } = req;
  const { created, validationFailed, internalServerError } = getJsonHandler();
  try {
    // Extract user input from request body
    const { username, email, password } = getBody();
    // Define validation rules
    const rules = {
      username: "username",
      email: "email",
      password: "password",
      passwordConf: "same:password",
    };
    // Validate user input
    const errors = verifyBody(rules);
    // If there are validation errors, respond with failure
    if (Object.keys(errors).length > 0) {
      return validationFailed({ errors });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
    // If user already exists, respond with conflict error
    if (existingUser) {
      return status(409).json({
        success: false,
        error: "User already exists.",
      });
    } else {
      // Hash the password securely
      const hashedPassword = await bcryptjs().hash(password, 10);
      
      // Create a new user with hashed password
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      
      // Generate JWT token with user information
      const token = generateAuthToken(newUser);
      req.session.token = token;
      // Send success response
      return created({ token });
    }
  } catch (error) {
    // Handle other errors (e.g., database error)
    internalServerError(error.message);
  }
};
