const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router({mergeParams: true});
const passportmongo = require("passport-local-mongoose");
const userschema = new mongoose.Schema({
email: {
    type: String,
    require : true
},
});
userschema.plugin(passportmongo);
module.exports = mongoose.model("User1", userschema);