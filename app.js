const Xprz = require("xprz");
const { App, HttpMethod, Route } = new Xprz();
const { launch, loadRoutes, setTemplateEngine } = new App();
launch();
setTemplateEngine().ejs();
loadRoutes("routes");
