//const passport = require("passport");
const User1 = require("../models/usermodel");
module.exports.signup = (req, res) => {
    res.render("users/signup.ejs");
}
module.exports.signupAsNew = async (req, res, next) => {
    const { username, password, email } = req.body;
    const newuser = new User1({ email, username });
    const saved = await User1.register(newuser, password);
    req.login(saved, (err) => {
        if (err) {
            req.flash("error", "something went wrong!!");
            return next(err);
        }
        req.flash("success", "wellcome to JUNAID KHAN");
        res.redirect("/listings");
    })
    // console.log(saved);
};
module.exports.login = (req, res) => {

    res.render("users/login.ejs");
};
module.exports.loginToWeb =  
async (req, res) => {

const Url = res.locals.redirectUrl || "/listings";

req.flash("success", "Wellcome back to JUNAID KHAN");
res.redirect(Url);
};
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            req.flash("error", "something went wrong!!");
            return next(err);
        }

    });
    req.flash("success", "logout successfully");
    res.redirect("/listings");
}