exports.getHome = (req, res) => {
  res().status(200).render("home", {
    Title: "Home",
    user: req.user,
  });
};
