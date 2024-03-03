exports.getHome = (req,res)=>{
    const {getReq } = req
    const request = getReq()
    const { status } = res;
    status(200).render("home", {
      Title: "Home",
      user : request.user
    });
}