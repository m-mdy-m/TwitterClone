// routes/auth.js
const {route,expose }= require('xprz').Route();
const { jwt } = require('xprz').Package()
const UserToken = $read('model/UserToken');
const { JWT_SECRET } = process.env;

// Endpoint for token refresh
route('/refresh').prefix('/auth').post(async (ctx) => {
  const { refreshToken } = ctx.body;

  try {
    // Verify the refresh token
    const decoded = jwt().verifyToken(refreshToken, JWT_SECRET);

    // Check if the refresh token exists in the database
    const existingToken = await UserToken.findOne({ token: refreshToken });

    if (!existingToken) {
      return ctx.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = jwt().signToken({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '1d' });

    // Send the new access token
    ctx.json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    ctx.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = expose;
