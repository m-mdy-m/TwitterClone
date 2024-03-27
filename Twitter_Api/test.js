const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const Clint = new TwitterApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

Clint.generateAuthLink("", { linkMode: "authorize" }).then((authLink) => {
  console.log("authLink :", authLink);
});
