const TweetUserManager = require("../../utils/helper");
const { handleRetweet } = require("../../utils/helperFunc");

const Tweet = $read("model/Tweet");
const User = $read("model/User");
const { generateTweetQueries } = $read("utils/helperFunc");
// Controller function to handle POST request to create a tweet
exports.create = async (ctx) => {
  // Extract the tweet content from the request body

  const { tweet } = ctx.getBody();

  // Extract JSON handling functions from the response object
  const { badRequest, created, internalServerError, authRequired } =
    ctx.jsonSender();

  // Check if the tweet content is missing; return a bad request response if so
  if (!tweet) {
    return badRequest("Tweet content is missing.");
  }
  // Check if req.user is missing; return an error response if so
  if (!ctx.user) {
    return authRequired("Authentication is required. Please sign in to tweet.");
  }
  // Construct the data object for tweet creation
  const data = {
    content: tweet,
    author: ctx.user.userId, // Assuming req.user contains the ID of the user posting the tweet
  };
  try {
    // Create the tweet and wait for the operation to complete
    const post = await Tweet.create(data);
    // Populate the 'author' field to include user details in the post
    const result = await Tweet.populate(post, { path: "author" });
    const newUser = await User.findByIdAndUpdate(ctx.user.userId, {
      $addToSet: { tweets: result._id },
    });
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
    const tokens = await tweetManager.saveUser(newUser);
    // Send a successful response with the created post
    created({ tweet: result, tokens: tokens });
  } catch (error) {
    // Handle any errors that occur during tweet creation
    internalServerError("Internal server error. Unable to post the tweet.");
  }
};
exports.getTweets = async (ctx) => {
  try {
    // Fetch tweets from the database and sort them in descending order of createdAt
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    // Populate the 'author' field to include user details in the post
    const result = await Tweet.populate(tweets, { path: "author" });
    // Increment view count for each tweet
    await Promise.all(
      result.map(async (tweet) => {
        // Increment the view count of each tweet if the user has not already viewed it
        if (ctx.user.userId && tweet) {
          await tweet.incrementViews(ctx.user.userId);
        }
      })
    );
    // Send JSON response with success true and tweet data
    ctx.status(200).json({
      success: true,
      tweets: result,
    });
  } catch (error) {
    console.log("error=>", error);
    // If an error occurs, send an error response
    ctx.status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};

/**
 * Like or unlike a tweet based on the provided tweet ID.
 * @param {Object} req - The request object containing parameters and user information.
 * @param {Object} jsonSender - Object containing error handling functions.
 * @returns {Object} - JSON response indicating success or failure.
 */
exports.likeTweet = async (ctx) => {
  // Destructure the error handling functions from jsonSender
  const { updated, internalServerError } = ctx.jsonSender();

  try {
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
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
    if (parentTweet) {
      id = parentTweet._id;
    }
    // Create the update queries for the user and the tweet
    const { UserQuery, TweetQuery } = generateTweetQueries(option, userId, id);
    // Update user and tweet documents
    let [newUser, newTweet] = await Promise.all([
      User.findByIdAndUpdate(userId, TweetQuery, { new: true }),
      Tweet.findByIdAndUpdate(id, UserQuery, { new: true }),
    ]);
    // Return a success response with the updated number of likes
    return updated({
      tokens: await tweetManager.saveUser(newUser),
      likes: newTweet.likes,
    });
  } catch (error) {
    console.log("error=>", error);
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.retweet = async (ctx) => {
  const { badRequest, created, internalServerError } = ctx.jsonSender();
  try {
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
    const { tweet, tweetId } = await tweetManager.findTweetParam();
    const userId = tweetManager.registerUser().userId;
    const content = ctx.body.content;
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
      tokens: await tweetManager.saveUser(updatedUser),
    });
  } catch (error) {
    // Handle any internal server errors
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.bookmarkTweet = async (ctx) => {
  // Destructure the error handling functions from jsonSender
  const { updated, internalServerError } = ctx.jsonSender();
  try {
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
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
      tokens: await tweetManager.saveUser(user),
    });
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
};

exports.deleteTweet = async (ctx) => {
  const { internalServerError, deleted, notFound } = ctx.jsonSender();
  try {
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
    const { user, tweetId, tweet } =
      await tweetManager.findTweetAndCurrentUser();
    // Checking if the current user is the author of the tweet
    if (user._id.toString() === tweet.author._id.toString()) {
      // Check if the tweet ID exists in the user's likedTweets, retweetedTweets, or bookmarked arrays
      const userHasTweet =
        user.likedTweets.includes(tweetId) ||
        user.retweetedTweets.includes(tweetId) ||
        user.bookmarked.includes(tweetId) ||
        user.tweets.includes(tweetId);
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
              tweets: tweetId,
            },
          }
        );
        // If the deletion and update operations were successful, return deleted status
        if (
          deleteResult.deletedCount === 1 &&
          updateResult.modifiedCount === 1
        ) {
          return deleted({ tokens: await tweetManager.saveUser(user) });
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
exports.editTweet = async (ctx) => {
  const { internalServerError, notFound, updated } = ctx.jsonSender();
  try {
    const { content } = ctx.getBody();
    const tweetManager = new TweetUserManager(ctx, ctx.jsonSender);
    const { tweet } = await tweetManager.findTweetParam();
    if (ctx.user.userId !== tweet.author._id.toString()) {
      return notFound("Only the author of the tweet can edit it.");
    }
    tweet.content = content;
    tweet.edited = true;
    await tweet.save();
    return updated({ tweet: tweet });
  } catch (error) {
    internalServerError("Internal server error. Please try again later.");
  }
};
