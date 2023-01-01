let mongoose = require("mongoose");

let storeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    storeName:{
        type:String,
        required:true
    },
    storePhoneNo:{
        type:String,
        required:true
    },
    storeNTN:{
        type:String,
        required:true
    },
    storeAddress:{
        type:String,
        required:true
    },
    storeOwnerCnic:{
        type:String,
        required:true
    },
    storeLogo:{
        type:String,
        required:true
    },
    storeStatus:{
        type:String,
        default:'pending'
    }
});

module.exports = mongoose.model("store",storeSchema);