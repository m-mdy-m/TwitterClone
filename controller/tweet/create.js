const PostTweet = require("../../model/PostTweet");
exports.postTweet =  async (req, res) => {
  const body = req.getBody();
  const { getJsonHandler } = res;
  const { badRequest } = getJsonHandler();
  const content = body.tweet;
  if (!content) {
    return badRequest("Tweet content is missing.");
  }
  const data ={
    content : content,
    postedBy : req.user._id, 
  }
  try {
    const post = await PostTweet.create(data);
    res.json({ success: true, message: "Tweet posted successfully.", post });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error. Unable to post the tweet." });
  }
};
