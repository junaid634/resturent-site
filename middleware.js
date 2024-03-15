module.exports.islogin = (req,res,next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You have to login first!!");
    res.redirect("/login");
}
return next();
}
module.exports.newUrl = (req,res,next)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();

}