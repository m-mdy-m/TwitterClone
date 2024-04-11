const User = require("../../model/User");
const Friends = require("../../model/Friends");
const TweetUserManager = require("../../utils/helper");
exports.updateFollowStatus = async (ctx) => {
  const { userId, followUserId } = ctx.body;
  const { success, internalServerError } = ctx.jsonSender();

  try {
    // Initialize TweetUserManager with context and jsonSender
    const userManager = new TweetUserManager(ctx, ctx.jsonSender);

    // Register the user (assuming registerUser() handles user registration)
    await userManager.registerUser();

    // Retrieve the current user information
    const user = await User.findById(followUserId);
    const userFollowed = user.followers.includes(userId);
    const option = userFollowed ? "$pull" : "$addToSet";

    // Update the follow status
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [option]: { following: followUserId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      followUserId,
      { [option]: { followers: userId } },
      { new: true }
    );
    // Save user and generate tokens
    const tokens = await userManager.saveUser(updatedUser);
    // Respond with success message and follow status
    success("Successfully unfollowed user.", {
      statusFollow: !userFollowed,
      tokens: tokens,
    });
  } catch (error) {
    console.log("error:", error);
    internalServerError();
  }
};

exports.handler_friend = async (ctx) => {
  const { userId, followUserId } = ctx.body;
  const { success, internalServerError } = ctx.jsonSender();
  try {
    //
  } catch (error) {
    internalServerError();
  }
};

exports.followingList = async (ctx) => {
  const { success, internalServerError } = ctx.jsonSender();
  try {
    const userId = ctx.param("userId");
    const user = await User.findById(userId);
    const users = await Promise.all(
      user.following.map(async (followerId) => {
        const user = await User.findById(followerId);
        return user;
      })
    );
    success(
      "Successfully retrieved the list of users followed by the specified user.",
      users
    );
  } catch (error) {
    internalServerError();
  }
};
