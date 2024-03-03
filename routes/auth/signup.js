const Xprz = require("xprz");
const { Route } = new Xprz();
const { getSignup, postSignup } = $read("controller/signup");
const route = new Route();
route.setRoute("/signup").get(getSignup).post(postSignup);
module.exports = route;
