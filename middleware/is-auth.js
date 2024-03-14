// Middleware function to ensure user authentication
exports.ensureAuthenticated = (req, res, next) => {
  // Check if the session exists and if the user object is stored in the session
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).redirect("/auth/login");
};