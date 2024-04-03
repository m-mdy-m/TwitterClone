const Xprz = require("xprz");
const {
  generateAuthToken,
  generateRefreshToken,
} = require("../utils/AuthToken");
const { clearAllCookies } = $read("utils/helperFunc");
const { jwt } = Xprz.Package();
// Middleware function to ensure user authentication
exports.ensureAuthenticated = (ctx, next) => {
  // Check if the session exists and if the user object is stored in the session
  if (ctx.session && ctx.session.token) {
    return next();
  }
  // Clear all cookies
  clearAllCookies(ctx);
  ctx.status(401).redirect("/auth/login");
};
/**
 * Middleware to verify JWT token extracted from cookies.
 */
exports.verifyToken = (ctx, nxt) => {
  let accessToken = ctx.cookies.accessToken;

  if (!accessToken || accessToken === "undefined") {
    // If access token is missing or undefined, redirect to login page
    ctx.redirect("/auth/login");
    return;
  }

  // Check if the access token is expired
  if (jwt().isExpired(accessToken)) {
    try {
      // Generate a new access token using refresh token
      generateRefreshToken(ctx).then((newAccessToken) => {
        if (newAccessToken) {
          // Set the new access token in session or cookies
          ctx.cookies.accessToken = newAccessToken;
          accessToken = newAccessToken; // Update the access token

          // Set the new access token in the Authorization header for authentication
          ctx.headers.authorization = `Bearer ${newAccessToken}`;
        }

        // Authenticate using the new access token
        return jwt().authenticate(process.env.ACCESS_TOKEN_PRIVATE_KEY)(ctx, nxt);
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      ctx.redirect("/auth/login");
      return;
    }
  } else {
    // Access token is valid, set it in the Authorization header for authentication
    ctx.headers.authorization = `Bearer ${accessToken}`;

    // Authenticate using the access token
    return jwt().authenticate(process.env.ACCESS_TOKEN_PRIVATE_KEY)(ctx, nxt);
  }
};
