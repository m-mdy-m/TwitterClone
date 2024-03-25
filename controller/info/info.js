const Tweet = require("../../model/Tweet");
const User = require("../../model/User");
exports.findUser = async (req, { status, getJsonHandler }) => {
  const { notFound, internalServerError } = getJsonHandler();
  try {
    const id = req.getQueryParam("id");
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        // If user is not found, send a 404 Not Found response
        return notFound("User not found");
      }
      // If user is found, send the user object as a JSON response
      return status(200).json({
        success: true,
        data: user,
      });
    }
    const user = req.user;
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return notFound("User not found");
    }
    // If user is found, send the user object as a JSON response
    return status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Send a 500 Internal Server Error response with a generic error message
    internalServerError("Something went wrong. Please try again later.");
  }
};

exports.findTweet = async (req, { getJsonHandler }) => {
  const { notFound, success, internalServerError } = getJsonHandler();
  try {
    const id = req.param("id");
    if (!id) {
      return notFound("Tweet ID is required.");
    }
    const tweet = await Tweet.findById(id);
    if (!tweet) {
      return notFound("Tweet not found.");
    }
    const result = await Tweet.populate(tweet, { path: "author" });
    success("Tweet found successfully.", result);
  } catch (error) {
    internalServerError(
      "An error occurred while processing your request. Please try again later."
    );
  }
};
