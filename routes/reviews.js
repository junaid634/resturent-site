const express = require("express");
const router = express.Router({ mergeParams: true });
//it is used to get extra information present in the request 
//for example listing/:id the value of id can be accessed by mergparams
// const newerr = require("../error_class.js");


const { islogin, asyncWrap, validateReview, isdata, isrOwner } = require("../middleware.js");
const { addReview, distroyReview } = require("../controller/review.js");


//listings/:id/review ------- add review route
router.post("/", islogin, isdata, validateReview, asyncWrap(addReview));
//---------------reviews delete method----------------

//delete review route
router.delete("/:reviewId", islogin, isrOwner, asyncWrap(distroyReview));

module.exports = router;