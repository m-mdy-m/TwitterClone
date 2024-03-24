const Tweet = require("../../model/Tweet");

exports.findUser = async (req, { status, getJsonHandler }) => {
  const { notFound, internalServerError } = getJsonHandler();
  try {
    const user = req.user;
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return notFound("User not found");
    }
    // If user is found, send the user object as a JSON response
    status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Send a 500 Internal Server Error response with a generic error message
    internalServerError("Something went wrong. Please try again later.");
  }
};

exports.findTweet= async(req,{getJsonHandler})=>{
  try {
  const { notFound, internalServerError } = getJsonHandler();
    const id = req.param('id')
    if (!id) {
      return notFound('tweet not found')
    }
    const tweet = await Tweet.findById(id)
    
  } catch (error) {
    
  }
}