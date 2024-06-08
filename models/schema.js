const mongoose = require("mongoose");
const Review = require("./reviewschema");

const userschema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        require: true,
        default: 1
    },
    location: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User1"
    },
    geometry:{ 
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
      
        },
        coordinates: {
          type: [Number],
          
        }
    } 
});
userschema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log(`${res.deletedCount} reviews are deleted!!`);
    } else {
        throw "something is wrong in deletion request";
    }
});
const User = mongoose.model("User", userschema);
module.exports = User;