const Xprz = require("xprz");
const PostTweet = require("../../model/PostTweet");
const User = require("../../model/User");
const { Package } = new Xprz();
const { jwt } = new Package();
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
    postedBy: req.user.userId, // Assuming req.user contains the ID of the user posting the tweet
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

exports.putLike = async (req, { getJsonHandler }) => {
  try {
    const { updated } = getJsonHandler();
    const id = req.param("id");
    const user = req.session.user
    const tweet = await PostTweet.findById(id);
    const isLike = isIdLiked([tweet, user], id);
    const option = isLike ? "$pull" : "$addToSet";
    const { query, updateQuery } = createQueries(option, user.userId, id);
    const [updatedUser,updateTweet] = await Promise.all([
      User.findByIdAndUpdate(user.userId, updateQuery, { new: true }),
      PostTweet.findByIdAndUpdate(id, query, { new: true }),
    ]);
    console.log('=>',updatedUser)
    // Generate JWT token with user information
    const token = jwt().jwtSign(
      {
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profile: updatedUser.profilePic,
        likes: updatedUser.likes,
      },
      process.env.JWT_SECRET
    );
    // Update session with updated user information
    req.session.user = updatedUser;
    req.session.token = token
    return updated({ likes: updateTweet.likes });
  } catch (error) {
    console.log("error =>", error);
  }
};
