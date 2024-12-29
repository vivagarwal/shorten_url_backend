const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required : true,
        unique : true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visited:[{timestamp: {type:Number}}],

},{timestamps:true});

module.exports = mongoose.model("url",urlSchema);