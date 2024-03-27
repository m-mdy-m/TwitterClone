const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

// Tell TypeScript it's a readonly app
const readOnlyClient = client.readOnly;

(async () => {
  try {
    const user = await readOnlyClient.v2.userByUsername('m__mdy_m');
    console.log('User:', user);

    const tweetResponse = await readOnlyClient.v2.tweet('hi this is test');
    console.log('Tweet response:', tweetResponse);
  } catch (error) {
    console.error('Error:', error);
  }
})();
