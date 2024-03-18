const express = require("express");
const router = express.Router();
const newerr = require("../error_class.js");
const User1 = require("../models/usermodel.js");
const passport = require("passport");
const { newUrl, asyncWrap } = require("../middleware.js");
// function asyncWrap(fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch((err) => next(err));
//     }
// };
router.get("/signup", (req, res) => {

    res.render("users/signup.ejs");
});
router.post("/signup",asyncWrap( async (req, res , next) => {
    const { username, password, email } = req.body;
    const newuser = new User1({ email, username });
    const saved = await User1.register(newuser, password);
    req.login(saved, (err)=>{
        if(err){
            req.flash("error", "something went wrong!!");
            return next(err);
        }
        req.flash("success", "wellcome to JUNAID KHAN");
        res.redirect("/listings");
    })
    console.log(saved);
}));
router.get("/login", (req, res) => {

    res.render("users/login.ejs");
});

router.post("/login", newUrl,
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    async (req, res) => {
        
        const Url = res.locals.redirectUrl || "/listings";

        req.flash("success", "Wellcome back to JUNAID KHAN");
        res.redirect(Url);
    });
    router.get("/logout", (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                req.flash("error", "something went wrong!!");
                return next(err);
            }
            
        });
        req.flash("success" , "logout successfully");
        res.redirect("/listings");
    });
module.exports = router;