let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    userImage:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("users",userSchema);