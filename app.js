// Import necessary modules
const Xprz = require("xprz");
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

use((err,req,res,nxt)=>{
  if (err.code === 'EBADCSRFTOKEN') {
    // CSRF token validation failed
    res.status(403).json({ error: 'CSRF token validation failed. Please refresh the page and try again.'  });
  } else {
    // Other errors
    nxt(err);
  }
})

// Connect to the database
$read("utils/database");

// Load route handlers
loadRoutes("routes");
