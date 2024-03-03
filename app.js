// Importing the Xprz framework module
const Xprz = require("xprz");
// Creating a new instance of the Xprz framework
const { SharedApp, App, Package } = new Xprz();
const { dotenv, session, connectMongoDbSession, csrf, flash } = new Package();
dotenv().setupDot();
// Destructuring commonly used methods from the App instance
const { use, launch, loadRoutes, setTemplateEngine, useJsonBody, static } =
  new App();
launch(); // Launching the server
useJsonBody(); // Parsing JSON request bodies
const { getApp } = new SharedApp();
static("public"); // Serving static files from the 'public' directory

// Connect to MongoDB session store using the provided URI and specify the collection name
const store = connectMongoDbSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
// Define options for session middleware, including session secret and store
const options = {
  secret: "ha ha ha", 
  resave: false,
  saveUninitialized: true,
  store: store,
};

// Initialize session middleware with the specified options
session(options);

loadRoutes("routes"); // Loading routes from the 'routes' directory
$read("utils/database"); // Loading database utility
