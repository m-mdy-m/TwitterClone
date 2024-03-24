const { handleRetweet } = require("../../utils/helperFunc");

const Tweet = $read("model/Tweet");
const User = $read("model/User");
const { isIdLiked, generateTweetQueries } = $read("utils/helperFunc");
const generateAuthToken = $read("utils/generateAuthToken");
// Controller function to handle POST request to create a tweet
exports.create = async (req, { getJsonHandler }) => {
  // Extract the tweet content from the request body

  const { tweet } = req.getBody();

  // Extract JSON handling functions from the response object
  const { badRequest, created, internalServerError, authRequired } =
    getJsonHandler();

  // Check if the tweet content is missing; return a bad request response if so
  if (!tweet) {
    return badRequest("Tweet content is missing.");
  }
  // Check if req.user is missing; return an error response if so
  if (!req.user) {
    return authRequired("Authentication is required. Please sign in to tweet.");
  }
  // Construct the data object for tweet creation
  const data = {
    content: tweet,
    author: req.user.userId, // Assuming req.user contains the ID of the user posting the tweet
  };
  try {
    // Create the tweet and wait for the operation to complete
    const post = await Tweet.create(data);

    // Populate the 'author' field to include user details in the post
    const result = await Tweet.populate(post, { path: "author" });
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
    // Populate the 'author' field to include user details in the post
    const result = await Tweet.populate(tweets, { path: "author" });
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

/**
 * Like or unlike a tweet based on the provided tweet ID.
 * @param {Object} req - The request object containing parameters and user information.
 * @param {Object} getJsonHandler - Object containing error handling functions.
 * @returns {Object} - JSON response indicating success or failure.
 */
exports.likeTweet = async (req, { getJsonHandler }) => {
  // Destructure the error handling functions from getJsonHandler
  const { updated, badRequest, authRequired, notFound, internalServerError } =
    getJsonHandler();

  try {
    // Extract the tweet ID from the request parameters
    let id = req.param("id");

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
    const tweetLikedByUser = tweet.likes.includes(user.userId);

    // Determine whether to add or remove the like based on the current state
    const option = tweetLikedByUser ? "$pull" : "$addToSet";
    // Update likes on the tweet and its parent (if it's a retweet)
    const parentTweet = await handleRetweet(tweet, user.userId, option,internalServerError);

    // Use the parent tweet ID if it's a retweet
    id = parentTweet._id;
    // Create the update queries for the user and the tweet
    const { UserQuery, TweetQuery } = generateTweetQueries(option, user.userId, id);

    // Update user and tweet documents
    let [newUser, newTweet] = await Promise.all([
      User.findByIdAndUpdate(user.userId, TweetQuery, { new: true }),
      Tweet.findByIdAndUpdate(id, UserQuery, { new: true }),
    ]);

    // Generate a new JWT token with updated user information
    const token = generateAuthToken(newUser);

    // Set the new JWT token in the session
    req.session.token = token;
    // Return a success response with the updated number of likes
    return updated({ token, likes: newTweet.likes });
  } catch (error) {
    console.log("error=>", error);
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.retweet = async (req, { getJsonHandler }) => {
  const { badRequest, created, authRequired, notFound, internalServerError } =
    getJsonHandler();
  try {
    const id = req.param("id");
    const userId = req.user.userId;
    // Check if the user is authenticated
    if (!userId) {
      // Return an authentication required error with a clear message
      return authRequired(
        "Authentication required. Please log in to perform this action."
      );
    }
    const content = req.body.content;
    const tweet = await Tweet.findById(id);

    if (!tweet) {
      return notFound("Tweet not found.");
    }
    const existingRetweet = await Tweet.findOne({
      originalTweet: id,
      author: userId,
    });

    if (existingRetweet) {
      return badRequest("You have already retweeted this tweet.");
    }
    const retweet = await Tweet.create({
      originalTweet: id,
      author: userId,
      content: content || tweet.content,
      likes: tweet.likes,
      retweeters: tweet.retweeters,
    });

    const { UserQuery, TweetQuery } = generateTweetQueries(
      "$addToSet",
      userId,
      id,
      true,
      retweet._id,
      "retweeters",
      "retweetedTweets"
    );
    const [updatedUser, updatedTweet] = await Promise.all([
      User.findByIdAndUpdate(userId, TweetQuery, { new: true }),
      Tweet.findByIdAndUpdate(id, UserQuery, { new: true }),
    ]);
    // Generate a new JWT token with updated user information
    const token = generateAuthToken(updatedUser);

    // Set the new JWT token in the session
    req.session.token = token;

    // Return a success response with the updated number of likes
    return created({ retweet: updatedTweet, token: token });
  } catch (error) {
    console.log("error=>", error);
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};
