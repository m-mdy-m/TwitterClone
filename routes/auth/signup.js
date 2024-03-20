const route = require('xprz').Route()
const { getSignup, postSignup } = $read("controller/auth/signup");
// Grouping authentication-related routes under the "/auth" prefix
route.group("/auth", (r) => {
  // Defining a GET route for the signup page and a POST route for signup action
  r.route("/signup").get(getSignup).post(postSignup);
});

module.exports = route;
