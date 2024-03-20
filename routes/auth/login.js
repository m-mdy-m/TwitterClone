const route = require('xprz').Route()

// Importing the getLogin and postLogin functions from the login controller
const { getLogin, postLogin } = $read("controller/auth/login");
// Grouping authentication-related routes under the "/auth" prefix
route.group("/auth", (r) => {
  // Defining a GET route for login page and a POST route for login action
  r.route("/login").get(getLogin).post(postLogin);

  // Defining a POST route for logout action
  r.route("/logout").post((req, { getJsonHandler }) => {
    // Destructuring getJsonHandler function from the second parameter
    const { success, error } = getJsonHandler();

    // Checking if user session exists
    if (req.session) {
      // Destroying the session
      req.session.destroy((err) => {
        if (err) {
          // Responding with an error if session destruction fails
          error(500, "Failed to delete session");
        } else {
          // Responding with success message if session is deleted successfully
          success("Session deleted successfully");
        }
      });
    } else {
      // Responding with an error if user is not logged in
      error(404, "User not logged in");
    }
  });
});

module.exports = route;
