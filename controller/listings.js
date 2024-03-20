const User = require("../models/schema");


module.exports.index = async (req, res) => {
    const list = await User.find({});
    res.render("index.ejs", { list });
};
module.exports.newlisting = (req, res) => {
    res.render("newlist.ejs");
};
module.exports.addNewListing = async (req, res) => {
    const data = req.body;
    data.owner = req.user._id;
    const user1 = new User(data);
    await user1.save();
    req.flash("success", "New listing is added!!");//------------------- pop up alerts
    console.log("data is pushed");
    res.redirect("/listings");
};
module.exports.editListings = async (req, res) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    res.render("editlist.ejs", { editlist });
};
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const data = req.body;
    await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    req.flash("success", "List is Succesfully edited!!");//------------------- pop up alerts
    res.redirect("/listings");
};
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const list = await User.findById(id).populate({ path: "reviews", populate: { path: "rOwner" } }).populate("owner");
    res.render("showlist.ejs", { list });
};
module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash("success", "List is deleted succesfully!!");
    res.redirect("/listings");
}
