const Xprz = require("xprz");

const { Package } = new Xprz();
const { jwt } = new Package();

// Middleware function to ensure user authentication
exports.ensureAuthenticated = (req, res, next) => {
  // Check if the session exists and if the user object is stored in the session
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).redirect("/auth/login");
};
exports.verifyToken = jwt().jwtAuthenticate(process.env.JWT_SECRET);
