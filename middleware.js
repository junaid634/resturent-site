const { serverschema, reviewschema } = require("./models/joischema");
const User = require("./models/schema");

module.exports.asyncWrap = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
};
module.exports.islogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You have to login first!!");
        res.redirect("/login");
    }
    return next();
}
module.exports.newUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    if (!res.locals.currUser) {
        return this.islogin;
    } else if (!(editlist.owner.equals(res.locals.currUser._id))) {
        req.flash("error", "You are not the Owner of this listing!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validatordata = async (req, res, next) => {
    const data = req.body;
    const result = serverschema.validate(data);
    if (result.error) {
        req.flash("error", "please make sure your data is correct!! >>>  ");
        return next(result.error);
    }
    next();
}
module.exports.validateReview = async (req, res, next) => {
    const data = req.body;
    const result = reviewschema.validate(data);
    if (result.error) {
        req.flash("error", "Please make sure you entered valid review!!");
        return next(result.error);
    }
    next();
}
module.exports.isdata = async (req, res, next) => {
    let { id } = req.params;
    const list = await User.findById(id);
    if (!list) {//------------------- pop up alerts
        req.flash("error", "Listing is not exist!!");
        return res.redirect("/listings");
    }
    next();
}