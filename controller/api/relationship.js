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
/**
 * @module followingListController
 * @description Exports the `followingList` function for retrieving a list of followed users.
 */

/**
 * @function followingList
 * @description Retrieves a list of users followed by the specified user.
 *
 * @param {Object} ctx - The context object from the framework.
 * @param {string} ctx.param("userId") - The ID of the user whose following list is requested.
 *
 * @returns {Promise} Resolves with an object containing:
 *   - `success` (boolean): Indicates successful retrieval.
 *   - `message` (string): Success or error message.
 *   - `data` (array): An array of followed user objects (if successful).
 *
 * @throws {Error} - Internal server error if an unexpected error occurs.
 */
exports.followingList = async (ctx) => {
  const { success, internalServerError } = ctx.jsonSender();
  try {
    // 1. Retrieve and Validate User ID:
    const userId = ctx.param("userId");
    const user = await User.findById(userId);
    if (!user) {
      return success(
        "User not found with the provided ID.",
        [], // Return an empty array or handle appropriately
      );
    }
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
