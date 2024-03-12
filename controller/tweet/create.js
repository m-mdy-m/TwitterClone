const PostTweet = require("../../model/PostTweet");

// Controller function to handle POST request to create a tweet
exports.postTweet = async (req, res) => {
  // Extract tweet content from request body
  const body = req.getBody();

  // Extract JSON handling functions from response object
  const { getJsonHandler } = res;
  const { badRequest, created, internalServerError } = getJsonHandler();

  // Extract tweet content from request body
  const content = body.tweet;

  // Check if tweet content is missing, return bad request response if so
  if (!content) {
    return badRequest("Tweet content is missing.");
  }

  // Construct data object for tweet creation
  const data = {
    content: content,
    postedBy: req.user._id, // Assuming req.user contains the ID of the user posting the tweet
  };

  try {
    // Create the tweet and wait for the operation to complete
    const post = await PostTweet.create(data);

    // Populate the 'postedBy' field to include user details in the post
    const result = await PostTweet.populate(post, { path: "postedBy" });

    // Send a successful response with the created post
    created(result);
  } catch (error) {
    // Handle any errors that occur during tweet creation
    internalServerError("Internal server error. Unable to post the tweet.");
  }
};
