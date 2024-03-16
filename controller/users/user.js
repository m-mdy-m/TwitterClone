const User = require("../../model/User");

exports.findUser = async ({param}, { status, getJsonHandler }) => {
  const username = param("username");
  const { notFound,internalServerError } = getJsonHandler();
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return notFound("User not found");
    }
    // If user is found, send the user object as a JSON response
    status(200).json({ success: true, data:{likes : user.likes, profilePic:user.profilePic,email:user.email} });
  } catch (error) {
    // Send a 500 Internal Server Error response with a generic error message
    internalServerError("Something went wrong. Please try again later." );
  }
};
