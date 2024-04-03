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
  let key = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  if (
    !accessToken ||
    accessToken === "undefined" ||
    jwt().isExpired(accessToken)
  ) {
    try {
      generateRefreshToken(ctx).then((newAccessToken) => {
        if (newAccessToken) {
          // Set the new access token in session or cookies
          ctx.session.token = newAccessToken;
          accessToken = newAccessToken;
          key = process.env.REFRESH_TOKEN_PRIVATE_KEY;
        }
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      ctx.redirect("/auth/login");
      return;
    }
  }
  ctx.headers.authorization = `Bearer ${accessToken}`;
  return jwt().authenticate(key)(ctx, nxt);
};
