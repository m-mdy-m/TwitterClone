function redirectToHome(req, res, nxt) {
  res.redirect("/home");
  nxt();
}
module.exports = redirectToHome;
