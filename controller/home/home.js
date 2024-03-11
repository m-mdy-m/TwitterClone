exports.getHome = (req, { status }) => {
  status(200).render("home", {
    Title: "Home",
    user: req.user,
  });
};
