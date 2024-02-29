const Xprz = require("xprz");
const { App } = new Xprz();
const { launch, loadRoutes, setTemplateEngine } = new App();
launch(); // start server 
setTemplateEngine().ejs(); // set template 
loadRoutes("routes"); // load all file routes 
