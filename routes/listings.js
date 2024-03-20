const express = require("express");
const router = express.Router();
const User = require("../models/schema.js");

const { islogin, isOwner, validatordata, asyncWrap, isdata } = require("../middleware.js");
const { index, newlisting, addNewListing, updateListing, showListings, distroyListing, editListings } = require("../controller/listings.js");
// all listings route

router.route("/")
.get( index)
.post( validatordata, asyncWrap(addNewListing));


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
    validatordata,
    isdata,
    asyncWrap(updateListing)
)
.get( isdata, asyncWrap(showListings))
.delete( islogin, isOwner, isdata, asyncWrap(distroyListing));
module.exports = router;