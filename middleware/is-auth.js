const Xprz = require("xprz");
const { generateAuthToken } = require("../utils/AuthToken");
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
  const accessToken = ctx.cookies.accessToken;
  if (
    !accessToken ||
    accessToken === "undefined" ||
    jwt().isExpired(accessToken)
  ) {
    const refreshToken = ctx.cookies.refreshToken;
    if (!refreshToken || refreshToken === "undefined") {
      ctx.redirect("/auth/login");
      return;
    }
    try {
      const decoded = jwt().verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY
      );
      // Check if the token is still valid
      if (decoded.exp < Date.now() / 1000) {
        ctx.status = 401;
        ctx.body = { message: "Refresh token expired" };
        return;
      }
      // Here you can perform additional checks on the refresh token payload if needed
      generateAuthToken(ctx.user).then((newAccessToken) => {
        ctx.cookie.accessToken = newAccessToken;
        ctx.headers.authorization = `Bearer ${newAccessToken}`;
        nxt();
      });
    } catch (error) {
      // Handle invalid refresh token
      ctx.status = 401;
      ctx.body = "Invalid refresh token";
      return;
    }
  }
  ctx.headers.authorization = `Bearer ${accessToken}`;
  return jwt().authenticate(process.env.JWT_SECRET)(ctx, nxt);
};
