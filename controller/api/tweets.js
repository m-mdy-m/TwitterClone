const TweetUserManager = require("../../utils/helper");
const { handleRetweet } = require("../../utils/helperFunc");

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
  const { updated, internalServerError } = getJsonHandler();

  try {
    const tweetManager = new TweetUserManager(req, getJsonHandler);
    // Extract the tweet ID from the request parameters
    const { tweet, tweetId } = await tweetManager.findTweetParam();

    let id = tweetId;
    // Extract the user information from the request
    const userId = tweetManager.registerUser().userId;

    const tweetLikedByUser = tweet.likes.includes(userId);

    // Determine whether to add or remove the like based on the current state
    const option = tweetLikedByUser ? "$pull" : "$addToSet";
    // Update likes on the tweet and its parent (if it's a retweet)
    const parentTweet = await handleRetweet(
      tweet,
      userId,
      option,
      internalServerError
    );

    // Use the parent tweet ID if it's a retweet
    id = parentTweet._id;
    // Create the update queries for the user and the tweet
    const { UserQuery, TweetQuery } = generateTweetQueries(option, userId, id);
    // Update user and tweet documents
    let [newUser, newTweet] = await Promise.all([
      User.findByIdAndUpdate(userId, TweetQuery, { new: true }),
      Tweet.findByIdAndUpdate(id, UserQuery, { new: true }),
    ]);

    // Return a success response with the updated number of likes
    return updated({
      token: tweetManager.saveUser(newUser),
      likes: newTweet.likes,
    });
  } catch (error) {
    console.log("error=>", error);
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.retweet = async (req, { getJsonHandler }) => {
  const { badRequest, created, internalServerError } = getJsonHandler();
  try {
    const tweetManager = new TweetUserManager(req, getJsonHandler);
    const { tweet, tweetId } = await tweetManager.findTweetParam();
    const userId = tweetManager.registerUser().userId;
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
    const result = await Tweet.populate(updatedTweet, { path: "author" });
    // Return a success response with the updated number of likes
    return created({
      retweet: result,
      token: tweetManager.saveUser(updatedUser),
    });
  } catch (error) {
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.bookmarkTweet = async (req, { getJsonHandler }) => {
  // Destructure the error handling functions from getJsonHandler
  const { updated, internalServerError } = getJsonHandler();
  try {
    const tweetManager = new TweetUserManager(req, getJsonHandler);
    const { tweetId, user } = await tweetManager.findTweetAndCurrentUser();
    const isAlreadyBookmarked = user.bookmarked.includes(tweetId);
    if (isAlreadyBookmarked) {
      // Remove the tweet ID from bookmarks
      user.bookmarked = user.bookmarked.filter(
        (id) => id.toString() !== tweetId.toString()
      );
    } else {
      // Add the tweet ID to bookmarks
      user.bookmarked.push(tweetId);
    }
    await user.save();
    // Generate a new JWT token with updated user information
    const isBookmarked = user.bookmarked.includes(tweetId);
    return updated({
      isBookmarked: isBookmarked,
      token: tweetManager.saveUser(user),
    });
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.deleteTweet = async (req, { getJsonHandler }) => {
  const { internalServerError, deleted, notFound } = getJsonHandler();
  try {
    const tweetManager = new TweetUserManager(req, getJsonHandler);
    const { user, tweetId, tweet } =
      await tweetManager.findTweetAndCurrentUser();
    // Checking if the current user is the author of the tweet
    if (user._id.toString() === tweet.author._id.toString()) {
      // Check if the tweet ID exists in the user's likedTweets, retweetedTweets, or bookmarked arrays
      const userHasTweet =
        user.likedTweets.includes(tweetId) ||
        user.retweetedTweets.includes(tweetId) ||
        user.bookmarked.includes(tweetId);

      // Delete the tweet from the tweets collection
      const deleteResult = await Tweet.deleteOne({ _id: tweetId });
      if (userHasTweet) {
        // Remove the tweet reference from the user's likedTweets, retweetedTweets, and bookmarked arrays
        const updateResult = await User.updateOne(
          { _id: user._id },
          {
            $pull: {
              likedTweets: tweetId,
              retweetedTweets: tweetId,
              bookmarked: tweetId,
            },
          }
        );
        // If the deletion and update operations were successful, return deleted status
        if (
          deleteResult.deletedCount === 1 &&
          updateResult.modifiedCount === 1
        ) {
          return deleted({ token: tweetManager.saveUser(user) });
        } else {
          // If deletion or update failed, return internal server error
          internalServerError("Failed to delete the tweet.");
        }
      } else {
        // If the user doesn't have the tweet, simply return deleted status
        if (deleteResult.deletedCount === 1) {
          return deleted();
        } else {
          // If deletion failed, return internal server error
          internalServerError("Failed to delete the tweet.");
        }
      }
    } else {
      // If the user is not the author of the tweet, send a not found status to the client
      return notFound("Only the author of the tweet can delete it.");
    }
  } catch (error) {
    // If an error occurs during the process, return internal server error
    internalServerError("Internal server error. Please try again later.");
  }
};
