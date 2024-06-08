const User = require("../models/schema");
const mbxgeo = require('@mapbox/mapbox-sdk/services/geocoding');
const accToken = process.env.map_api;
const baseClient = mbxgeo({ accessToken: accToken });


module.exports.index = async (req, res) => {
    const list = await User.find({});
    res.render("index.ejs", { list });
};
module.exports.searchlist = async(req,res)=>{

    const {location1} = req.query;
    

    // Construct a fuzzy regex for the location
    const regex = new RegExp(`.*${location1.split('').join('.*')}.*`, 'i');
    
    // Query posts based on fuzzy regex for location
    const list = await User.find({ location: { $regex: regex } });//location is field in schema
    
    
    res.render("index.ejs", { list });

};
module.exports.newlisting = (req, res) => {
    res.render("newlist.ejs");
};
module.exports.addNewListing = async (req, res) => {

let responce =  await baseClient.forwardGeocode({
        query: `${req.body.location}`,
        limit: 1
      })
        .send();
    const data = req.body;
    const url = req.file.path;
    const filename = req.file.filename;
    data.owner = req.user._id;
    const user1 = new User(data);
    user1.image.url = url;
    user1.image.filename = filename;
    user1.geometry = responce.body.features[0].geometry;
    //   console.log("this is check :" , user1);
    const result = await user1.save();
    console.log(result);
    req.flash("success", "New listing is added!!");//------------------- pop up alerts
    console.log("data is pushed");
    res.redirect("/listings");
};
module.exports.editListings = async (req, res) => {
    let { id } = req.params;
    let editlist = await User.findById(id);
    let originalImage = editlist.image.url;
    originalImage = originalImage.replace("/upload","/upload/h_100,w_150");
    console.log(originalImage);
    res.render("editlist.ejs", { editlist , originalImage});
};
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const data = req.body;
    let responce =  await baseClient.forwardGeocode({
        query: `${req.body.location}`,
        limit: 1
      })
        .send();
    data.geometry = responce.body.features[0].geometry; 
    const newdata = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if(typeof req.file != "undefined"){

        const url = req.file.path;
        const filename = req.file.filename;
        newdata.image = {url,filename};
        console.log(newdata);
        newdata.save();
    }
        req.flash("success", "List is Succesfully edited!!");//------------------- pop up alerts
        res.redirect("/listings");
};
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    let access = process.env.map_api;
    const list = await User.findById(id).populate({ path: "reviews", populate: { path: "rOwner" } }).populate("owner");
    // let cords = list.geometry.coordinates;
    // res.locals.cord = cords
    // console.log(res.locals.cord);
    res.render("showlist.ejs", { list });
};
module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    let listing = await User.findByIdAndDelete(id);
    req.flash("success", "List is deleted succesfully!!");
    res.redirect("/listings");
}
