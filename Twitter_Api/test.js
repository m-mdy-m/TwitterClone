const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();
const client = new TwitterApi(process.env.BEARER_TOKEN);

const readOnlyClient = client.readOnly;

(async () => {
  try {
    const user = await readOnlyClient.v2.userByUsername("m__mdy_m");
    console.log("User:", user);

    const tweetResponse = await readOnlyClient.v2.tweet(
      "hi this is test in nodejs"
    );
    console.log("Tweet response:", tweetResponse);
  } catch (error) {
    console.error("Error:", error);
  }
})();
