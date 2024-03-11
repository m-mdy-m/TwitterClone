exports.getHome = ({getReq}, {status}) => {
  const req = getReq();
  status(200).render("home", {
    Title: "Home",
    user: req.user,
  });
};
