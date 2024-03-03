exports.ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
  console.log('test ensureAuthenticated')
  return next();
  }
  return res.status(401).redirect("/login");
};
exports.test = (req,res,nxt)=>{
  console.log('test list middleware')
  return nxt()
}