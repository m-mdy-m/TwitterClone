exports.getHome = (req, res) => {
  const { status } = res();
  status(200).render("home", {
    Title: "Home",
    user: req.user,
  });
};
