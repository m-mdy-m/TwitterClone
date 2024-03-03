const Xprz = require("xprz");
const { Route } = new Xprz();
const { getLogin } = $read('controller/auth/login')
const route = new Route();
route.setRoute("/login").get(getLogin);
module.exports = route;
