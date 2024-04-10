const Tweet = require("../../model/Tweet");
const User = require("../../model/User");
const bcryptjs = require("xprz").Package().bcryptjs();
exports.findUser = async (ctx) => {
  const { notFound, internalServerError } = ctx.jsonSender();
  try {
    const id = ctx.query("id");
    if (id) {
      const user = await User.findById(id);
      if (!user) {
        // If user is not found, send a 404 Not Found response
        return notFound("User not found");
      }
      // If user is found, send the user object as a JSON response
      return ctx.status(200).json({
        success: true,
        data: user,
      });
    }
    const user = ctx.user;
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return notFound("User not found");
    }
    // If user is found, send the user object as a JSON response
    return ctx.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("error:", error);
    // Send a 500 Internal Server Error response with a generic error message
    internalServerError("Something went wrong. Please try again later.");
  }
};

exports.findTweet = async (ctx) => {
  const { notFound, success, internalServerError } = ctx.jsonSender();
  try {
    const id = ctx.param("id");
    if (!id) {
      return notFound("Tweet ID is required.");
    }
    const tweet = await Tweet.findById(id);
    const result = await Tweet.populate(tweet, { path: "author" });
    success("Tweet found successfully.", result);
  } catch (error) {
    internalServerError(
      "An error occurred while processing your request. Please try again later."
    );
  }
};
exports.edit_user_mode = async (ctx) => {
  const { notFound, success, internalServerError, validationFailed } =
    ctx.jsonSender();
  try {
    const { username, email, bio, userId } = ctx.getQuery();
    const rules = {
      username: "username",
      email: "email",
    };
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return notFound("User not found.");
    }
    const existingUser = await User.findOne({
      $and: [{ _id: { $ne: userId } }, { $or: [{ username }, { email }] }],
    });
    if (existingUser) {
      return ctx.status(409).json({
        success: false,
        error: "User already exists.",
      });
    }
    // Check if there are any changes to update
    const changes = {};
    if (username !== undefined && username !== user.username) {
      changes.username = username;
    }
    if (email !== undefined && email !== user.email) {
      changes.email = email;
    }
    if (bio !== undefined && bio !== user.bio) {
      changes.bio = bio;
    }
    // If no changes are detected, send success response
    if (Object.keys(changes).length === 0) {
      return success("No changes detected.");
    }
    const errors = ctx.verifyBody(rules);
    if (Object.keys(errors).length > 0) {
      return validationFailed({
        errors: errors.username || errors.email,
      });
    }
    // Apply changes and save user
    Object.assign(user, changes);
    await user.save();
    return success();
  } catch (error) {
    internalServerError(
      "An error occurred while processing your request. Please try again later."
    );
  }
};
exports.checkPassword = async (ctx) => {
  const { notFound, success, internalServerError, validationFailed } =
    ctx.jsonSender();
  try {
    const value = ctx.param("password");
    const userId = ctx.query("id");
    const user = await User.findById(userId);
    const match = await bcryptjs.compare(value, user.password);
    if (!match) {
      return ctx.status(403).json({
        error: "password is not match",
        success: false,
      });
    }
    success();
  } catch (error) {
    internalServerError(
      "An error occurred while processing your request. Please try again later."
    );
  }
};
exports.changePassword = async (ctx) => {
  const {  success, internalServerError, validationFailed } = ctx.jsonSender();
  try {
    const { password } = ctx.body
    const userId = ctx.param("id");
    console.log('password:',password)
    console.log('userId:',userId)
    // const user = await User.findById(userId);
    // const rules = {
    //   password: "password",
    // };
    // const errors = ctx.verifyBody(rules);
    // if (Object.keys(errors).length > 0) {
    //   return validationFailed({
    //     errors: errors.password,
    //   });
    // }
    // const hashedPassword = await bcryptjs.hash(password);
    // user.password = hashedPassword;
    // await user.save();
    // success();
  } catch (error) {
    internalServerError(
      "An error occurred while processing your request. Please try again later."
    );
  }
};
