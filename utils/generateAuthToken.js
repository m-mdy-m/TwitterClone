const { jwt } = require("xprz").Package();
function generateAuthToken(user) {
  try {
    // Extract user information
    const {
      _id,
      username,
      email,
      profilePic,
      likedTweets,
      retweetedTweets,
      bookmarked,
    } = user;
    // Generate JWT token with user information
    const accessToken = jwt().signToken(
      {
        userId: _id,
        username,
        email,
        profilePic,
        likedTweets,
        retweetedTweets,
        bookmarked,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Generate refresh token
    const refreshToken = jwt().refreshToken(
      accessToken,
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    // Handle token generation errors
    console.error("Error generating JWT token:", error);
    return null; // Or throw an error based on your error handling strategy
  }
}
module.exports = generateAuthToken;
