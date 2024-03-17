const Xprz = require("xprz");
const { Package } = new Xprz();
const { jwt } = new Package();
function generateAuthToken(user) {
    // Extract user information
    const { _id, username, email, profilePic, likes } = user;
  
    // Generate JWT token with user information
    const token = jwt().jwtSign(
      {
        userId: _id,
        username,
        email,
        profilePic,
        likes,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );
  
    return token;
  }
  
  module.exports = generateAuthToken;