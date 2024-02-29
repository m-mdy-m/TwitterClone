const Xprz = require("xprz");
const { App } = new Xprz();
const { launch, loadRoutes, setTemplateEngine, useJsonBody,static } = new App();
launch(); // start server
useJsonBody();
setTemplateEngine().ejs(); // set template
static('public')
loadRoutes("routes"); // load all file routes
