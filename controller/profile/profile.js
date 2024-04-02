exports.getProfile = (ctx) => {
  const username = ctx.param("username");
  console.log("username:", username);
  ctx.send("hello");
};
