function getHome(req, res, nxt) {
  res.redirect("/home");
  nxt();
}
module.exports = getHome;
