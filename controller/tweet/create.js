exports.postTweet = (req, res) => {
  const body = req.getBody();
  const { getJsonHandler } = res;
  const { badRequest } = getJsonHandler();
  if (!body.tweet) {
    return badRequest("Tweet content is missing.");
  }
};
