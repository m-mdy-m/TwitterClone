const {createServer} = require('http')
const {Server} = require('socket.io')
const mongoose = require('mongoose')
// Import necessary modules
const Xprz = require("xprz");
// Initialize Xprz package with dotenv setup
Xprz.Package().dotenv();

// Destructure required functions from Xprz App module
const { use, useCtx, launch, loadRoutes, bodyParsing, static } = Xprz.App();

// Launch the application
launch();
// Enable parsing of JSON bodies
bodyParsing();

// Serve static files from the 'public' directory
static("public");

// Import and use cookie-parser middleware
const cookieParser = require("cookie-parser");
use(cookieParser());

// Load setup middleware
$read("middleware/setup");

useCtx((ctx, nxt) => {
  if (ctx.code === "EBADCSRFTOKEN") {
    // CSRF token validation failed
    ctx
      .status(403)
      .json({ error: "CSRF token validation failed. Please try again." });
  } else {
    // Other errors
    nxt(ctx);
  }
});

useCtx((ctx, next) => {
  ctx.status(500).send("Something broke!");
});
// Connect to the database
$read("utils/database");

// Load route handlers
loadRoutes("routes");
