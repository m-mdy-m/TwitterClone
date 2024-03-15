const PostTweet = require("../../model/PostTweet");
const User = require("../../model/User");
const { isIdLiked, createQueries } = require("../../utils/helperFunc");
// Controller function to handle POST request to create a tweet
exports.postTweet = async (req, { getJsonHandler }) => {
  // Extract the request body
  const body = req.getBody();

  // Extract JSON handling functions from the response object
  const { badRequest, created, internalServerError, authRequired } =
    getJsonHandler();

  // Extract the tweet content from the request body
  const content = body.tweet;

  // Check if the tweet content is missing; return a bad request response if so
  if (!content) {
    return badRequest("Tweet content is missing.");
  }
  // Check if req.user is missing; return an error response if so
  if (!req.user) {
    return authRequired("Authentication is required. Please sign in to tweet.");
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
    // Fetch tweets from the database and sort them in descending order of createdAt
    const tweets = await PostTweet.find().sort({ createdAt: -1 });
    // Populate the 'postedBy' field to include user details in the post
    const result = await PostTweet.populate(tweets, { path: "postedBy" });
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

exports.putLike = async (req, { status, getJsonHandler }) => {
  const { success } = getJsonHandler();
  const id = req.param("id");
  const user = req.user;
  const tweet = PostTweet.findById(id)
  const isLike = isIdLiked([tweet,user],id)
  const option = isLike ? "$pull" : "$addToSet";
  const { query, updateQuery } = createQueries(option, user.id, id);
  req.session.user = await User.findByIdAndUpdate(user, updateQuery, {new: true});
  const insertTweet = await PostTweet.findByIdAndUpdate(id, query, {new: true});
  console.log('req.session.user =>',req.session.user)
  console.log('insertTweet =>',insertTweet)
  success("Operation successful");
};
