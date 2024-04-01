const { bcryptjs } = require("xprz").Package();
const path = require("path");
const generateAuthToken = $read("utils/generateAuthToken");
const User = $read("model/User");
// Controller function to render the login page
exports.getLogin = ({ sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/main.html"));
};
/**
 *  username : Ads242sxz
 * email : mahdimamashli1383@gmail.com
 * password : Asd24242@4
 *
 * : user 2
 *
 * username : Mahdi1383
 * email : sdma@gmail.com
 * password : Mdy_mmshly1383
 *
 * :user 3
 * username : Medishn2
 * email : Asdd@gmail.com
 * password : Mdy_mmshly1393@@
 * :user 4
 * username : m__mdy__m
 * email : sdma2@gmail.com
 * password : mas242sxza2ASx@
 */
// Controller function to handle login form submission
exports.postLogin = async (ctx) => {
  const { username, email, password } = ctx.getBody();
  const { badRequest, notFound, internalServerError, updated } =
    ctx.jsonSender();
  try {
    // Validate if username or email is provided
    if (!username && !email) {
      return badRequest("Username or email is required for login.");
    } // Find user by username and email
    const user = await User.findOne({ username: username, email: email });
    // Check if user exists
    if (!user) {
      return notFound("Please register to create an account.");
    }
    // Check if the request already has a user logged in
    if (ctx.user) {
      // Check if the found user matches the logged-in user
      const isSameUser = ctx.user._id.toString() === user._id.toString();
      // If it's the same user, return a response indicating they're already logged in
      if (isSameUser) {
        return status(409).json({
          success: false,
          error: "You are already logged, please logout first.",
        });
      }
    }

    // Compare password hashes
    const passwordMatches = await bcryptjs().compare(password, user.password);
    if (!passwordMatches) {
      return status(401).json({
        success: false,
        error: "Incorrect password. Please try again.",
      });
    }
    // If authentication is successful, generate a JWT token
    const token = generateAuthToken(user);
    // Set user session
    ctx.session.token = token;
    // Send success response
    return updated({ token });
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
};
