const Xprz = require("xprz");

const {Package }= new Xprz()
const { jwt} = new Package()

// Middleware function to ensure user authentication
exports.ensureAuthenticated = (req, res, next) => {
  // Check if the session exists and if the user object is stored in the session
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).redirect("/auth/login");
};
exports.verifyToken  = (req,res,nxt)=>{
  // Extract the token from the request headers or query parameters
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }
  try {
    // Verify the token
    const decoded = jwt().jwtVerify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    nxt();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}