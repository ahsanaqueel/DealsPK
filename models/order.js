let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({

        customerName:{
            type:String,
            required:true
        },
        customerEmail:{
            type:String,
            required:true
        },
        customerPhone:{
            type:String,
            required:true
        },
        customerAddress:{
            type:String,
            required:true
        },
        orderAmount:{
            type:Number,
            required:true
        },
        orderProducts:{
            type:Array(Object),
            required:true,
        }
      
    });
    // mongodb://localhost:27017
    module.exports = mongoose.model("order",orderSchema);