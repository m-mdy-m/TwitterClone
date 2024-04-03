const path = require("path");
const TweetUserManager = require("../../utils/helper");

exports.getProfile = (ctx) => {
  const username = ctx.param("username");
  const manager = new TweetUserManager(ctx, ctx.jsonSender);
  const user = manager.registerUser();
  if (user.username === username) {
    return ctx.jsonSender().success('Operation successful',{username});
  }
};
