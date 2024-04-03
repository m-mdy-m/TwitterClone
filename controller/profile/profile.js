const path = require("path");
const TweetUserManager = require("../../utils/helper");

exports.getProfile = (ctx) => {
  const username = ctx.param("username");
  const manager = new TweetUserManager(ctx, ctx.jsonSender);
  const user = manager.registerUser();
  if (user.username === username) {
    // If the username matches, send a success response with the username
    return ctx.jsonSender().success('Operation successful', { username });
  } else {
    // If the username does not match, send an error response
    return ctx.jsonSender().error('Unauthorized', 401);
  }
};
exports.ProfileUser = ({sendFile})=>{
  sendFile(path.join(process.cwd(), "/public/main.html"));
}