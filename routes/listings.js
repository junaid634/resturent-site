const express = require("express");
const router = express.Router();
const newerr = require("../error_class.js");
const { serverschema } = require("../models/joischema.js");
const User = require("../models/schema.js");
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
};


router.get("/", async (req, res) => {
    const list = await User.find({});
    res.render("index.ejs", { list });
});
router.get("/new", (req, res) => {
    res.render("newlist.ejs");
});
router.post("/", asyncWrap(async (req, res) => {
    const data = req.body;
    const result = serverschema.validate(data);// check validation if data is ok or not ok
    // console.log(data);
    if (result.error) {
        console.log(result.error.message);
        throw new newerr(401, result.error.message);
    } else {

        const user1 = new User(data);
        await user1.save();
        req.flash("success", "New listing is added!!");//------------------- pop up alerts
        console.log("data is pushed");
        res.redirect("/listings");
    }
    //-----------manual error handling without joi----------------


    // if(!data){
    // next(new newerr(401,"data not found"));
    // }
    // if(user1.title!="" & user1.description!="" & user1.price!="" & user1.country !=""){
    // console.log(data);
    // next(new newerr(401,"fill all required fields"));

}));
router.get("/edit/:id", asyncWrap(async (req, res) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    res.render("editlist.ejs", { editlist });
}));
router.patch("/:id", asyncWrap(async (req, res) => {
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
    const list = await User.findById(id).populate("reviews");


    if(!list){//------------------- pop up alerts
        req.flash("error", "Listing is not exist!!");
        res.redirect("/listings"); 
    }


    res.render("showlist.ejs", { list });
}));
router.delete("/:id", asyncWrap(async (req, res) => {
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