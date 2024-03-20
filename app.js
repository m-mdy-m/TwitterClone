const Xprz = require("xprz");
const rateLimit = $install("express-rate-limit");
Xprz.Package().dotenv().setupDot();
const { use, launch, loadRoutes, useJsonBody, static } = Xprz.App();
launch();
useJsonBody();
static("public");
const cookieParser = $install("cookie-parser");
use(cookieParser());
$read("middleware/setup");
$read("utils/database");
loadRoutes("routes");
use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  })
);
