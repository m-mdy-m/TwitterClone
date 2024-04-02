exports.getProfile = (ctx) => {
  const username = ctx.param("username");
  const user = ctx.user
  console.log('user:',user.username);
  console.log('username:',username);
  const { } = ctx.jsonSender()
  ctx.send("hello");
};
