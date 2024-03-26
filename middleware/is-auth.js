const Xprz = require("xprz");
const { clearAllCookies } = $read("utils/helperFunc");
const { jwt } = Xprz.Package();
// Middleware function to ensure user authentication
exports.ensureAuthenticated = (req, res, next) => {
  // Check if the session exists and if the user object is stored in the session
  if (req.session && req.session.token) {
    return next();
  }
  // Clear all cookies
  clearAllCookies(req, res);
  return res.status(401).redirect("/auth/login");
};
/**
 * Middleware to verify JWT token extracted from cookies.
 */
exports.verifyToken = (req, res, nxt) => {
  const token = req.cookies.token;
    if (!token || token==='undefined'|| jwt().isTokenExpired(token)) {
    console.log('token :'+token)
    // Clear all cookies
    clearAllCookies(req, res);
    return res.status(401).redirect("/auth/login");
  }
  req.headers.authorization = `Bearer ${token}`;
  jwt().jwtAuthenticate(process.env.JWT_SECRET)(req, res, nxt);
};
