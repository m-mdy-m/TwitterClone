const path = require("path");
const TweetUserManager = require("../../utils/helper");

exports.getProfile = (ctx) => {
  const username = ctx.param("username");
  const manager = new TweetUserManager(ctx, ctx.jsonSender);
  const user = manager.registerUser();
  if (user.username === username) {
    // If the username matches, send a success response with the username
    return ctx
      .jsonSender()
      .success("Operation successful", { username, user: user });
  } else {
    // If the username does not match, send an error response
    return ctx
      .jsonSender()
      .internalServerError("Something went wrong. Please try again later.");
  }
};
exports.ProfileUser = ({ sendFile }) => {
  sendFile(path.join(process.cwd(), "/public/main.html"));
};

exports.deleteAccount = (ctx) => {
  const { success, internalServerError } = ctx.jsonSender();
  try {
    co
  } catch (error) {
    internalServerError(error.message);
  }
};
