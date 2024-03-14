const PostTweet = require("../../model/PostTweet");

// Controller function to handle POST request to create a tweet
exports.postTweet = async (req, { getJsonHandler }) => {
  // Extract the request body
  const body = req.getBody();

  // Extract JSON handling functions from the response object
  const { badRequest, created, internalServerError } = getJsonHandler();

  // Extract the tweet content from the request body
  const content = body.tweet;

  // Check if the tweet content is missing; return a bad request response if so
  if (!content) {
    return badRequest("Tweet content is missing.");
  }
  // Check if req.user is missing; return an error response if so
  if (!req.user) {
    return badRequest("User information is missing. Please login.");
  }
    // Construct the data object for tweet creation
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
exports.getTweets = async (req, res) => {
  try {
    // Fetch tweets from the database
    const tweets = await PostTweet.find();
    const result = await PostTweet.populate(tweets, {path : 'postedBy' })
    // Send JSON response with success true and tweet data
    res.status(200).json({
      success: true,
      tweets: result,
    });

  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};