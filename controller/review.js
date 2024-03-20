const Review = require("../models/reviewschema");
const User = require("../models/schema");

module.exports.addReview = async (req, res) => {
    let { id } = req.params;
    let list = await User.findById(id);
    let data = req.body;
    let newreview = new Review(data.review);
    list.reviews.push(newreview);
    await newreview.save();
    await list.save();
    req.flash("success", "Review is added succesfully!!");
    return res.redirect(`/listings/${id}`);

}
module.exports.distroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if (!reviewId) { // pop up alerts
        req.flash("error", "Review Not Exist!!");
        return res.redirect("/listings/:id/reviews");
    }
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review is deleted succesfully!!");
    res.redirect(`/listings/${id}`);
}