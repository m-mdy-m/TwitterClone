const Xprz = require("xprz");
const { Route } = new Xprz();
const route = new Route();
route
  .setRoute("/signup")
  .get(() => {
    const { status } = route.res();
    status(200).render("auth/signup.ejs", {
      Title: "signup",
    });
  })
  .post(() => {
    const { getBody } = route.req();
    const body = getBody();
    console.log("body=>", body);
  });
module.exports = route;
