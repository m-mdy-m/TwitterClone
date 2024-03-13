// Importing the Xprz framework module
const Xprz = require("xprz");
// Creating a new instance of the Xprz framework
const { App, Package } = new Xprz();
new Package().dotenv().setupDot(); // Loading environment variables from '.env' file
// Destructuring commonly used methods from the App instance
const { use, launch, loadRoutes, useJsonBody, static } = new App();
launch(); // Launching the server
useJsonBody(); // Parsing JSON request bodies
static("public"); // Serving static files from 'public' directory
const cookieParser = $install("cookie-parser"); // Installing and using cookie-parser middleware
use(cookieParser());
$read("middleware/setup"); // Including setup middleware
use($read("middleware/user")); // Including user middleware
$read("utils/database"); // Loading database utility
loadRoutes("routes"); // Loading routes from the 'routes' directory
