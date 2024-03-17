const express = require("express");
const router = express.Router();
const newerr = require("../error_class.js");
const { serverschema } = require("../models/joischema.js");
const User = require("../models/schema.js");
const {islogin, isOwner, validatordata} = require("../middleware.js");
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
};


router.get("/", async (req, res) => {
    const list = await User.find({});
    res.render("index.ejs", { list });
});
router.get("/new",islogin, (req, res) => {
    res.render("newlist.ejs");
    console.log(req.user);
});
router.post("/",validatordata, asyncWrap(async (req, res) => {
    const data = req.body;
    // const result = serverschema.validate(data);// check validation if data is ok or not ok
    // if (result.error) {
    //     console.log(result.error.message);
    //     throw new newerr(401, result.error.message);
    // } else {
        data.owner = req.user._id;
        const user1 = new User(data);
        await user1.save();
        req.flash("success", "New listing is added!!");//------------------- pop up alerts
        console.log("data is pushed");
        res.redirect("/listings");
    // }

}));
router.get("/edit/:id",islogin,isOwner, asyncWrap(async (req, res) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    res.render("editlist.ejs", { editlist });
}));

//update route
router.patch("/:id",islogin,isOwner,validatordata, asyncWrap(async (req, res) => {
    let { id } = req.params;
    const data = req.body;
   const listing =  await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
   console.log(listing);


   if(!listing){//------------------- pop up alerts
    req.flash("error", "Listing is not exist!!");
    res.redirect("/listings");
   } 


   req.flash("success", "List is Succesfully edited!!");//------------------- pop up alerts
    res.redirect("/listings");
}));

router.get("/:id", asyncWrap(async (req, res) => {
    let { id } = req.params;

    const list = await User.findById(id).populate("reviews").populate("owner");


    if(!list){//------------------- pop up alerts
        req.flash("error", "Listing is not exist!!");
        res.redirect("/listings"); 
    }
    // console.log(res.locals.currUser);
    // console.log(list.owner);

    res.render("showlist.ejs", { list });
}));
router.delete("/:id",islogin,isOwner, asyncWrap(async (req, res) => {
    let { id } = req.params;
    const list = await User.findByIdAndDelete(id);


    if(!list){//------------------- pop up alerts
        req.flash("error", "Listing is not exist!!");
        res.redirect("/listings"); 
    }

    
    req.flash("success", "List is deleted succesfully!!");
    res.redirect("/listings");
}));


module.exports = router;