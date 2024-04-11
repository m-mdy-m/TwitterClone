const path = require("path");
const User = require("../../model/User");
exports.getPage = ({sendFile})=>{
  sendFile(path.join(process.cwd(), "/public/main.html"));
}
exports.getPageUser= async (ctx)=>{
  const username = ctx.param("username");
  const user = await User.findOne({username:username})
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
}