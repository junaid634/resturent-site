const express = require("express");
const router = express.Router({mergeParams: true});
//it is used to get extra information present in the request 
//for example listing/:id the value of id can be accessed by mergparams
// const newerr = require("../error_class.js");
const User = require("../models/schema.js");
const Review = require("../models/reviewschema.js");
// const { reviewschema } = require("../models/joischema.js");
const { islogin ,asyncWrap, validateReview, isdata, isrOwner} = require("../middleware.js");
//listings/:id/review
router.post("/",islogin,isdata,validateReview, asyncWrap(async (req, res) => {
    let { id } = req.params;
    let list = await User.findById(id);
    let data = req.body;
        let newreview = new Review(data.review);
        list.reviews.push(newreview);
        await newreview.save();
        await list.save();
        req.flash("success", "Review is added succesfully!!");
        res.redirect(`/listings/${id}`);
    
}));
//---------------reviews delete method----------------


router.delete("/:reviewId",islogin,isrOwner, asyncWrap(async (req, res) => {
    let { id, reviewId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if(!reviewId){ // pop up alerts
        req.flash("error", "Review Not Exist!!");
       return res.redirect("/listings/:id/reviews"); 
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review is deleted succesfully!!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;