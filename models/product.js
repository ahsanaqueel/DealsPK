let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'store'
    },
    productTitle:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    productSizeWithStock:{
        type:Object,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    productImage1:{
        type:String
    },
    productImage2:{
        type:String
    },
    productImage3:{
        type:String
    },
    totalProductStock:{
        type:Number,
        required:true
    },
    productFeatured:{
        type:String,
        default:'false'
    },
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports = mongoose.model("products",productSchema);