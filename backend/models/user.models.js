const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports = mongoose.model("user", userSchema);