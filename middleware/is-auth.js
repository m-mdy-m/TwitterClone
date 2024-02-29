exports.ensureAuthenticated  = (req,res,nxt,statuscode=401, redirect = '/signup',)=>{
  if (req.session && req.session.user) {
    return nxt()
  }
  return res.status(statuscode).redirect(redirect);
}