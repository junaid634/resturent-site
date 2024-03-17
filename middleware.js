const { serverschema } = require("./models/joischema");
const User = require("./models/schema")
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
module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
    let editlist = await User.findById(id);
    console.log(editlist);
    console.log(res.locals.currUser);

    if(!(editlist.owner.equals(res.locals.currUser._id))){
        req.flash("error", "You are not the Owner of this listing!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validatordata = async(req,res,next)=>{
    const data = req.body;
    const result = serverschema.validate(data);
    if(result.error){
        req.flash("error","please make sure your data is correct!! >>>  ");
        return next(result.error);
    }
    next();
}