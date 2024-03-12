const PostTweet = require("../../model/PostTweet");
exports.getHome = async (req, res) => {
  const { status } = res;
  try {
    // Fetch tweets from the database
    const tweets = await PostTweet.find();
    console.log("tweets =>", tweets);
    status(200).render("home", {
      Title: "Home",
      user: req.user,
    });
    // Send JSON response with success true and tweet data
    res.json({
      success: true,
      data: tweets,
    });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
