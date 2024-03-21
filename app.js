// Import necessary modules
const Xprz = require("xprz");
const rateLimit = $install("express-rate-limit");

// Initialize Xprz package with dotenv setup
Xprz.Package().dotenv().setupDot();

// Destructure required functions from Xprz App module
const { use, launch, loadRoutes, useJsonBody, static, setErrorHandler } =
  Xprz.App();

// Launch the application
launch();

// Enable parsing of JSON bodies
useJsonBody();

// Serve static files from the 'public' directory
static("public");

// Import and use cookie-parser middleware
const cookieParser = $install("cookie-parser");
use(cookieParser());

// Load setup middleware
$read("middleware/setup");

// Connect to the database
$read("utils/database");

// Load route handlers
loadRoutes("routes");

// Define rate-limiting options
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
};

// Create a rate-limiting middleware using the defined options
const rateLimiter = rateLimit(rateLimitOptions);

// Apply the rate-limiting middleware to the application
use(rateLimiter);

setErrorHandler((err, req, res, nxt) => {
  if (err instanceof rateLimiter.RateLimitError) {
    res.status(429).json({ error: err.message });
  } else {
    nxt(err);
  }
});
