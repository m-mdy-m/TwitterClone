const Tweet = $read("model/Tweet");
const ReTweet = $read("model/ReTweet");
const User = $read("model/User");
const { isIdLiked, generateTweetQueries } = $read("utils/helperFunc");
const generateAuthToken = $read("utils/generateAuthToken");
// Controller function to handle POST request to create a tweet
exports.Tweet = async (req, { getJsonHandler }) => {
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
    const post = await Tweet.create(data);

    // Populate the 'postedBy' field to include user details in the post
    const result = await Tweet.populate(post, { path: "postedBy" });
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
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    // Populate the 'postedBy' field to include user details in the post
    const result = await Tweet.populate(tweets, { path: "postedBy" });
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

exports.likeTweet = async (req, { getJsonHandler }) => {
  // Destructure the error handling functions from getJsonHandler
  const { updated, badRequest, authRequired, notFound, internalServerError } =
    getJsonHandler();

  try {
    // Extract the tweet ID from the request parameters
    const id = req.param("id");

    // Check if the tweet ID is missing
    if (!id) {
      // Return a bad request error with a clear message
      return badRequest("Invalid request. Please provide a valid tweet ID.");
    }

    // Extract the user information from the request
    const user = req.user;

    // Check if the user is authenticated
    if (!user) {
      // Return an authentication required error with a clear message
      return authRequired(
        "Authentication required. Please log in to perform this action."
      );
    }

    // Find the tweet by its ID
    const tweet = await Tweet.findById(id);

    // Check if the tweet exists
    if (!tweet) {
      // Return a not found error with a clear message
      return notFound("Tweet not found. Please provide a valid tweet ID.");
    }

    // Determine if the user has already liked or unliked the tweet
    const isLike = isIdLiked([tweet, user], id);

    // Determine whether to add or remove the like based on the current state
    const option = isLike ? "$pull" : "$addToSet";

    // Create the update queries for the user and the tweet
    const { query, updateQuery } = generateTweetQueries(
      option,
      user.userId,
      id
    );

    // Execute the update operations on the user and the tweet
    const [updatedUser, updatedTweet] = await Promise.all([
      User.findByIdAndUpdate(user.userId, updateQuery, { new: true }),
      Tweet.findByIdAndUpdate(id, query, { new: true }),
    ]);

    // Generate a new JWT token with updated user information
    const token = generateAuthToken(updatedUser);

    // Set the new JWT token in the session
    req.session.token = token;

    // Return a success response with the updated number of likes
    return updated({ token, likes: updatedTweet.likes });
  } catch (error) {
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.retweet = async (req, { getJsonHandler }) => {
  const { updated, badRequest, authRequired, notFound, internalServerError } =
    getJsonHandler();
  try {
    const id = req.param("id");
    const userId = req.user.userId;
    const content = req.body.content
    // try and delete retweet
    const tweet = await Tweet.findById(id)
    console.log('tweet =>',tweet);
    // const deletePost = await Tweet.findOneAndDelete({
    //   postedBy: id,
    //   originalTweet: userId,
    // });
    // const option = deletePost ? "$pull" : "$addToSet";
    // if (!deletePost) {
    //   await Tweet.create({ postedBy: userId, originalTweet: id,content:'tweet.content' });
    // }
    // // Create the update queries for the user and the tweet
    // const { query, updateQuery } = generateTweetQueries(
    //   option,
    //   userId,
    //   id,
    //   'retweeters',
    //   "retweets",
    // );
    // // Execute the update operations on the user and the tweet
    // const [updatedUser, updatedTweet] = await Promise.all([
    //   User.findByIdAndUpdate(userId, updateQuery, { new: true }),
    //   Tweet.findByIdAndUpdate(id, query, { new: true }),
    // ]);
    // // Generate a new JWT token with updated user information
    // const token = generateAuthToken(updatedUser);

    // // Set the new JWT token in the session
    // req.session.token = token;

    // // Return a success response with the updated number of likes
    // return updated({ token, retweet: updatedTweet });
  } catch (error) {
    console.log("error=>", error);
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};
