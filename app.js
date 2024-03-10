// Importing the Xprz framework module
const Xprz = require("xprz");
// Creating a new instance of the Xprz framework
const { App, Package, HttpMethod } = new Xprz();
new Package().dotenv().setupDot();
// Destructuring commonly used methods from the App instance
const { use, launch, loadRoutes, setTemplateEngine, useJsonBody, static } = new App();
launch(); // Launching the server
const { setBaseRoute } = new HttpMethod();
useJsonBody(); // Parsing JSON request bodies
setTemplateEngine().ejs(); // set template engine ejs
static("public"); // Serving static files from the 'public' directory
$read("middleware/setup");
use($read("middleware/user"));
use($read("middleware/locals"));
setBaseRoute("/get-csrf-token").GET((req, res) => {
  res.json({ csfToken: req.session.csrfSecret });
});
$read("utils/database"); // Loading database utility
loadRoutes("routes"); // Loading routes from the 'routes' directory
