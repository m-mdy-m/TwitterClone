exports.isAuth = (req,res,nxt)=>{
    if (req.session && req.session.user) {
        return nxt()
    }
    return res.status(301).redirect('/login')
}