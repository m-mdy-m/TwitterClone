const Xprz = require("xprz");
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
  const token = ctx.cookies.token;
  if (!token || token === "undefined" || jwt().isTokenExpired(token)) {
    // Clear all cookies
    clearAllCookies(ctx);
    ctx.status(401).redirect("/auth/login");
  }
  ctx.headers.authorization = `Bearer ${token}`;
  jwt().jwtAuthenticate(process.env.JWT_SECRET)(ctx, nxt);
};
