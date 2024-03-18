const express = require("express");
const router = express.Router();
const User = require("../models/schema.js");
const {islogin, isOwner, validatordata, asyncWrap, isdata  } = require("../middleware.js");

router.get("/", async (req, res) => {
    const list = await User.find({});
    res.render("index.ejs", { list });
});
router.get("/new",islogin, (req, res) => {
    res.render("newlist.ejs");
});
router.post("/",validatordata, asyncWrap(async (req, res) => {
        const data = req.body;
        data.owner = req.user._id;
        const user1 = new User(data);
        await user1.save();
        req.flash("success", "New listing is added!!");//------------------- pop up alerts
        console.log("data is pushed");
        res.redirect("/listings");
}));
//edit route
router.get("/edit/:id",islogin,isOwner,isdata, asyncWrap(async (req, res) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    res.render("editlist.ejs", { editlist });
}));
//update route
router.patch("/:id",
islogin,
isOwner,
validatordata,
isdata,
 asyncWrap(async (req, res) => {
    let { id } = req.params;
    const data = req.body;
    await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    req.flash("success", "List is Succesfully edited!!");//------------------- pop up alerts
    res.redirect("/listings");
}));
//show route
router.get("/:id",isdata, asyncWrap(async (req, res) => {
    let { id } = req.params;
    const list = await User.findById(id).populate("reviews").populate("owner");
    res.render("showlist.ejs", { list });
}));
//delete route
router.delete("/:id",islogin,isOwner,isdata, asyncWrap(async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id); 
    req.flash("success", "List is deleted succesfully!!");
    res.redirect("/listings");
}));
module.exports = router;