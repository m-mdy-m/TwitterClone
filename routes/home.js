const { route, expose } = require("xprz").Route();
const {ensureAuthenticated, verifyToken } = $read("middleware/is-auth");
const { getHome } = $read("controller/home/home");
route("/")
  .using([verifyToken])
  .get(({ redirect }) => redirect("/home"));
route("/home").using([ensureAuthenticated,verifyToken]).get(getHome);

module.exports = expose;
