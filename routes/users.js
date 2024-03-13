const express = require("express");
const router = express.Router();
const newerr = require("../error_class.js");
const User1 = require("../models/usermodel.js");
const passport = require("passport");
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
};
router.get("/signup", (req, res) => {

    res.render("users/signup.ejs");
});
router.post("/signup",asyncWrap( async (req, res) => {
    const { username, password, email } = req.body;
    const newuser = new User1({ email, username });
    const saved = await User1.register(newuser, password);
    console.log(saved);
    req.flash("success", "wellcome to JUNAID KHAN");
    res.redirect("/listings");
}));
router.get("/login", (req, res) => {

    res.render("users/login.ejs");
});

router.post("/login",
    passport.authenticate("local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }),
    async (req, res) => {
        req.flash("success", "Wellcome back to JUNAID KHAN");
        res.redirect("/listings");

    });
module.exports = router;