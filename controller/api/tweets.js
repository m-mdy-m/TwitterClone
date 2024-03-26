const { handleRetweet, findTweetAndCurrentUser, findTweet, registerUser } = require("../../utils/helperFunc");

const Tweet = $read("model/Tweet");
const User = $read("model/User");
const { generateTweetQueries } = $read("utils/helperFunc");
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
    const {tweet,tweetId} = await findTweet(req,getJsonHandler)
    let id =tweetId
    // Extract the user information from the request
    const user = req.user;

    // Check if the user is authenticated
    if (!user) {
      // Return an authentication required error with a clear message
      return authRequired(
        "Authentication required. Please log in to perform this action."
      );
    }

    const tweetLikedByUser = tweet.likes.includes(user.userId);

    // Determine whether to add or remove the like based on the current state
    const option = tweetLikedByUser ? "$pull" : "$addToSet";
    // Update likes on the tweet and its parent (if it's a retweet)
    const parentTweet = await handleRetweet(
      tweet,
      user.userId,
      option,
      internalServerError
    );

    // Use the parent tweet ID if it's a retweet
    id = parentTweet._id;
    // Create the update queries for the user and the tweet
    const { UserQuery, TweetQuery } = generateTweetQueries(
      option,
      user.userId,
      id
    );
    // console.log('id=>',id);
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
    const {tweet,tweetId} = await findTweet(req,getJsonHandler)
    const userId = registerUser(req,getJsonHandler).userId
    const content = req.body.content;
    const existingRetweet = await Tweet.findOne({
      originalTweet: tweetId,
      author: userId,
    });

    if (existingRetweet) {
      return badRequest("You have already retweeted this tweet.");
    }
    const retweet = await Tweet.create({
      originalTweet: tweetId,
      author: userId,
      content: content || tweet.content,
      likes: tweet.likes,
      retweeters: tweet.retweeters,
      isRetweeted: true,
    });

    const { UserQuery, TweetQuery } = generateTweetQueries(
      "$addToSet",
      userId,
      tweetId,
      true,
      retweet._id,
      "retweeters",
      "retweetedTweets"
    );
    const [updatedUser, updatedTweet] = await Promise.all([
      User.findByIdAndUpdate(userId, TweetQuery, { new: true }),
      Tweet.findByIdAndUpdate(tweetId, UserQuery, { new: true }),
    ]);
    // Generate a new JWT token with updated user information
    const token = generateAuthToken(updatedUser);

    // Set the new JWT token in the session
    req.session.token = token;

    const result = await Tweet.populate(updatedTweet, { path: "author" });
    // Return a success response with the updated number of likes
    return created({ retweet: result, token: token });
  } catch (error) {
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.bookmarkTweet = async (req, { getJsonHandler }) => {
  // Destructure the error handling functions from getJsonHandler
  const { updated, internalServerError } =getJsonHandler();
  try {
   const {tweetId, currentUser} = await findTweetAndCurrentUser(req,getJsonHandler)
    const isAlreadyBookmarked = currentUser.bookmarked.includes(tweetId);
    if (isAlreadyBookmarked) {
      // Remove the tweet ID from bookmarks
      currentUser.bookmarked = currentUser.bookmarked.filter((id) => id.toString() !== tweetId.toString());
    } else {
      // Add the tweet ID to bookmarks
      currentUser.bookmarked.push(tweetId);
    }
    await currentUser.save();
    // Generate a new JWT token with updated currentUser information
    const isBookmarked = currentUser.bookmarked.includes(tweetId);
    const token = generateAuthToken(currentUser);
    // Set the new JWT token in the session
    req.session.token = token;
    return updated({ isBookmarked:isBookmarked, token: token });
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
};


exports.deleteTweet = async (req,{getJsonHandler})=>{
  // Destructure the error handling functions from getJsonHandler
  const { internalServerError } = getJsonHandler();
  try {
    const { tweet, currentUser,tweetId} = await findTweetAndCurrentUser(req,getJsonHandler)
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
}