const PostTweet = require("../../model/PostTweet");
const path = require("path");
exports.getHome = async (req, {json,status,sendFile}) => {
  try {
    // Fetch tweets from the database
    const tweets = await PostTweet.find();
    // Send JSON response with success true and tweet data
    sendFile(path.join(process.cwd(),'/frontend/html/home.html'))
    json({
      success: true,
      data: tweets,
    });
  } catch (error) {
    // If an error occurs, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
