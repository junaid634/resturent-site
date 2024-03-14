module.exports.islogin = (req,res,next)=>{
if(!req.isAuthenticated()){
    req.flash("error","You have to login first!!");
    res.redirect("/login");
}
return next();
}