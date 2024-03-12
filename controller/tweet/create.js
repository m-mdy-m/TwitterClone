const PostTweet = require("../../model/PostTweet");
exports.postTweet = async (req, res) => {
  const body = req.getBody();
  const { getJsonHandler } = res;
  const { badRequest, created, internalServerError } = getJsonHandler();
  const content = body.tweet;
  if (!content) {
    return badRequest("Tweet content is missing.");
  }
  const data = {
    content: content,
    postedBy: req.user._id,
  };
  try {
    const post = await PostTweet.create(data);
    created(post);
  } catch (error) {
    internalServerError("Internal server error. Unable to post the tweet.");
  }
};
