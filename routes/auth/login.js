const Xprz = require("xprz");
const { Route } = new Xprz();
const { getLogin,postLogin } = $read('controller/auth/login')
const route = new Route();
route.setRoute("/login").get(getLogin).post(postLogin)
module.exports = route;
