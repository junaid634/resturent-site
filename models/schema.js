const mongoose = require("mongoose");
const Review = require("./reviewschema");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/junaid");
};
main().then(() => { console.log("connected") });

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
        type: String,
        default: "https://images.unsplash.com/photo-1682685797168-613fd0cae41d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1682685797168-613fd0cae41d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v

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
    ]
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