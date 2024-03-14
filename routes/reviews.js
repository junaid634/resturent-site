const express = require("express");
const router = express.Router({mergeParams: true});
//it is used to get extra information present in the request 
//for example listing/:id the value of id can be accessed by mergparams
const newerr = require("../error_class.js");
const User = require("../models/schema.js");
const Review = require("../models/reviewschema.js");
const { reviewschema } = require("../models/joischema.js");
const { islogin } = require("../middleware.js");



function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
};


router.post("/",islogin, asyncWrap(async (req, res) => {
    let { id } = req.params;
    let list = await User.findById(id);
    let data = req.body;
    const result = reviewschema.validate(req.body);
    if(!list){//------------------- pop up alerts
        req.flash("error", "Review is not Added!!");
        res.redirect("/listings/:id/reviews"); 
    }
    // console.log(result);
    if (result.error) {
        throw new newerr(401, result.error.message);
    }
    else {
        let newreview = new Review(data.review);
        // console.log(newreview);

        list.reviews.push(newreview);
        await newreview.save();
        await list.save();
        req.flash("success", "Review is added succesfully!!");
        res.redirect(`/listings/${id}`);
    }
}));
//---------------reviews delete method----------------


router.delete("/:reviewId",islogin, asyncWrap(async (req, res) => {
    let { id, reviewId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if(!reviewId){ // pop up alerts
        req.flash("error", "Review Not Exist!!");
        res.redirect("/listings/:id/reviews"); 
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review is deleted succesfully!!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;