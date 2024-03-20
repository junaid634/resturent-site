const mongoose = require("mongoose");
//-----------------review schema started -------------------



const reviewschema = new mongoose.Schema({
    content: String,
    rat: {
        type: Number,
        max: 5,
        min: 1
    },
    createdat: {
        type: Date,
        default: Date.now()
    },
    rOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User1"
    }

});
const Review = mongoose.model("Review", reviewschema);
module.exports = Review;