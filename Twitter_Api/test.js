const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const readOnlyClient = new TwitterApi({
  clientId: process.env.Client_ID,
  clientSecret:process.env.Client_Secret,
  appKey: process.env.API_kEY,
  appSecret: process.env.API_kEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

(async () => {
  try {
    // const user = await readOnlyClient.v2.userByUsername("m__mdy__m");
    // console.log("user =>", user);
    // Since this is a read-only client, you won't be able to tweet
    const tweet = await readOnlyClient.v2.tweet("hi this is test from nodejs");
    console.log("tweet =>", tweet);
  } catch (error) {
    console.error(error);
  }
})();