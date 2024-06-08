const express = require("express");
const router = express.Router();
const passport = require("passport");
const { newUrl, asyncWrap } = require("../middleware.js");
const { signup, signupAsNew, login, loginToWeb, logout } = require("../controller/user.js");
const { searchlist } = require("../controller/listings.js");

//signup form route
router
.route("/signup")
.get( signup)
.post( asyncWrap(signupAsNew));
// it is actually put in listing route but due to duiling of routes we use it 
// in this route to avoid errors
router.route("/search")
.get(searchlist);

//login route
router
.route("/login")
.get( login)
.post(newUrl, passport.authenticate("local",
{
    failureRedirect: "/login",
    failureFlash: true
}),
 loginToWeb);

 //logout route
router.get("/logout", logout);

module.exports = router;