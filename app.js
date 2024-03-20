const Xprz = require('xprz')

const { App, Package } = new Xprz();
new Package().dotenv().setupDot(); 
const { use, launch, loadRoutes, useJsonBody, static } = new App();
launch();
useJsonBody(); 
static("public");
const cookieParser = $install("cookie-parser");
use(cookieParser());
$read("middleware/setup");
$read("utils/database"); 
loadRoutes("routes");
