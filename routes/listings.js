const express = require("express");
const router = express.Router();
const multer = require("multer");


const { islogin, isOwner, validatordata, asyncWrap, isdata } = require("../middleware.js");
const { index, newlisting, addNewListing, updateListing, showListings, distroyListing, editListings, searchlist } = require("../controller/listings.js");
// all listings route

const {storage} = require("../cloudinaryconfig.js"); 
const User = require("../models/schema.js");
const upload = multer({storage});
router.route("/")
.get( index)
.post(upload.single("image"),validatordata, asyncWrap(addNewListing)

);
// router.route("/search")
// .get(searchlist);


// route for add new listing
router.route("/new")
.get( islogin, newlisting);


//edit route
router.route("/edit/:id")
.get( islogin, isOwner, isdata, asyncWrap(editListings));

//update route
router.route("/:id")
.patch(
    islogin,
    isOwner,
    upload.single("image"),
    isdata,
    validatordata,
    asyncWrap(updateListing)
)
.get( isdata, asyncWrap(showListings))
.delete( islogin, isOwner, isdata, asyncWrap(distroyListing));
module.exports = router;