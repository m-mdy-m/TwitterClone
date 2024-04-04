const { bcryptjs } = require("xprz").Package();
const path = require("path");
const { validateAuth } = $read("utils/validation");
const {generateAuthToken} = $read("utils/AuthToken");
const User = $read("model/User");
// Controller function to render the signup page
exports.getSignup = ({ sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/main.html"));
};
// Controller function to handle signup form submission
exports.postSignup = async (ctx) => {
  const { created, validationFailed, internalServerError } = ctx.jsonSender();
  try {
    // Extract user input from request body
    const { username, email, password } = ctx.getBody();
    validateAuth(ctx, validationFailed);
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    // If user already exists, respond with conflict error
    if (existingUser) {
      return ctx.status(409).json({
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
      const tokens = await generateAuthToken(newUser);
      ctx.session.token = tokens.accessToken ;
      // Send success response
      return created({ tokens });
    }
  } catch (error) {
    
    // Handle other errors (e.g., database error)
    internalServerError(error.message);
  }
};
