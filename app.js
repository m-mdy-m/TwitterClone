// Importing the Xprz framework module
const Xprz = require("xprz");
const mongoose = $install("mongoose");
// Creating a new instance of the Xprz framework
const { App, Package } = new Xprz();
new Package().dotenv().setupDot();
// Destructuring commonly used methods from the App instance
const { launch, loadRoutes, setTemplateEngine, useJsonBody, static } =
  new App();
launch(); // Launching the server
useJsonBody(); // Parsing JSON request bodies
setTemplateEngine().ejs(); // Setting up the template engine (using EJS in this case)
static("public"); // Serving static files from the 'public' directory
loadRoutes("routes"); // Loading routes from the 'routes' directory
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("connect to database"));
