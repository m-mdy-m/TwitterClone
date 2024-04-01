const {route,group,expose} = require('xprz').Route()

// Importing the getLogin and postLogin functions from the login controller
const { getLogin, postLogin } = $read("controller/auth/login");
// Grouping authentication-related routes under the "/auth" prefix
group("/auth", (r) => {
  // Defining a GET route for login page and a POST route for login action
  r.route("/login").get(getLogin).post(postLogin);

  // Defining a POST route for logout action
  r.route("/logout").post(({jsonSender,session}) => {
    // Destructuring getJsonHandler function from the second parameter
    const { success, error } = jsonSender();

    // Checking if user session exists
    if (session) {
      // Destroying the session
      session.destroy((err) => {
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

module.exports = expose;
