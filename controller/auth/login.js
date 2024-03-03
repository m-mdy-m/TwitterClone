exports.getLogin = (req,res)=>{
    const { status } = res;
  status(200).render("auth/login.ejs", {
    Title: "Login",
  });
}