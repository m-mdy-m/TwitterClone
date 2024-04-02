const { jwt } = require("xprz").Package();
const UserToken = require("../model/UserToken");
async function generateAuthToken(user) {
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
      { expiresIn: "15m" }
    );
    // Generate refresh token
    const refreshToken = jwt().refreshToken(
      accessToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "7d" }
    );
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    const existingToken = await UserToken.findOneAndDelete({ userId: _id });
    await new UserToken({ userId: _id, token: refreshToken }).save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw error;
  }
}
async function verifyRefreshToken(refreshToken) {
  try {
    const key = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    // Find user token in the database
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) {
      throw new Error("Invalid refresh token");
    }

    // Verify refresh token
    return jwt().verifyToken(refreshToken, key);
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    throw error;
  }
}

module.exports = { generateAuthToken, verifyRefreshToken };
