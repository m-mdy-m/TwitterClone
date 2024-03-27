const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const readOnlyClient = new TwitterApi({
  clientId: process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

(async () => {
  try {
    const tweet = await readOnlyClient.v2.tweet("hi this is test from nodejs");
    console.log("tweet =>", tweet);
  } catch (error) {
    console.error(error);
  }
})();