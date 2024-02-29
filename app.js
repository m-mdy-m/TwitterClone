const Xprz = require("xprz");
const { App } = new Xprz();
const { launch, loadRoutes, setTemplateEngine, useJsonBody } = new App();
launch(); // start server
useJsonBody();
setTemplateEngine().ejs(); // set template
loadRoutes("routes"); // load all file routes
