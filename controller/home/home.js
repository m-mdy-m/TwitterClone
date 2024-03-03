exports.getHome = (request,response)=>{
    const {getReq } = request
    const req = getReq()
    const { status } = response;
    status(200).render("home", {
      Title: "Home",
      user : req.user
    });
}