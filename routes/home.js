const { route, expose } = require("xprz").Route();
const { verifyToken } = $read("middleware/is-auth");
const { getHome } = $read("controller/home/home");
route("/")
  .mid([verifyToken])
  .get(({ redirect }) => redirect("/home"));
route("/home").mid([verifyToken]).get(getHome);

module.exports = expose;
