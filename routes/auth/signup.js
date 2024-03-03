const Xprz = require("xprz");
const { Route } = new Xprz();
const { isPassword, isEmail, isUsername } = require("vfyjs");
const route = new Route();
route
  .setRoute("/signup")
  .get(() => {
    const { status } = route.res();
    status(200).render("auth/signup.ejs", {
      Title: "signup",
      oldValue: {
        username: null,
        email: null,
        password: null,
        passwordConf: null,
      },
    });
  })
  .post(() => {
    const { getBody } = route.req();
    const { getJsonHandler } = route.res();
    const { success, validationFailed, internalServerError } = getJsonHandler();
    const body = getBody();
    try {
      const username = isUsername(body.username);
      const email = isEmail(body.email);
      const password = isPassword(body.password);
      const passwordConf = body.password === body.passwordConf;
      if (username && email && password && passwordConf) {
        success("Signup successful");
      } else {
        // Validation failed
        validationFailed({
          username: body.username,
          email: body.email,
          password: body.password,
          passwordConf: body.passwordConf,
        });
      }
    } catch (error) {
      // Handle other errors (e.g., database error)
      internalServerError();
    }
  });
module.exports = route;
