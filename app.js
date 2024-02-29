const Xprz = require("xprz");
const { App } = new Xprz();
const { launch, loadRoutes, setTemplateEngine } = new App();
launch();
setTemplateEngine().ejs();
loadRoutes("routes");
