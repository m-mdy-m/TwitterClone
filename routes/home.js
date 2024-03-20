const route = require('xprz').Route()
const { ensureAuthenticated ,verifyToken} = $read("middleware/is-auth")
const { getHome } = $read("controller/home/home");
route.route("/").get((req, { redirect }) => redirect("/home"));
route.route("/home").using([ensureAuthenticated,verifyToken]).get(getHome);

module.exports = route;
