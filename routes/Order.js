let express = require('express');
let router = express.Router();
let Order = require('../models/order');
let Product = require('../models/product');

router.post('/orderdetails',async(req,res)=>{

    try {

        console.log(req.body);
        let order =await new Order(req.body);
        await order.save(order);

        order.orderProducts.forEach(async(product)=>{
            let pid =product.productId;
            let productDetails =await Product.findById(pid);
            console.log(productDetails);
            console.log(productDetails.productSizeWithStock["Small"]);
            console.log(productDetails.productSizeWithStock)
            console.log(product.productQuantity);

            if(product.size=='Small'){
                let Small=productDetails.productSizeWithStock["Small"] - product.productQuantity;
                productDetails.productSizeWithStock={...productDetails.productSizeWithStock, Small}
                productDetails.totalProductStock=productDetails.totalProductStock- product.productQuantity;
            }else if(product.size=='Medium'){
            // quantityChange = await Product.updateOne({_id:productDetails._id},{$set:{ "productSizeWithStock.Medium" : productSizeWithStock.Medium - product.productQuantity}})
            let Medium=productDetails.productSizeWithStock["Medium"] - product.productQuantity;
            productDetails.productSizeWithStock={...productDetails.productSizeWithStock, Medium}
            productDetails.totalProductStock=productDetails.totalProductStock- product.productQuantity;
        }
        else if(product.size=='Large'){
            // quantityChange = await Product.updateOne({_id:productDetails._id},{$set:{ "productSizeWithStock.Medium" : productSizeWithStock.Medium - product.productQuantity}})
            let Large=productDetails.productSizeWithStock["Large"] - product.productQuantity;
            productDetails.productSizeWithStock={...productDetails.productSizeWithStock, Large}
            productDetails.totalProductStock=productDetails.totalProductStock- product.productQuantity;
        }
        else if(product.size=='xLarge'){
            // quantityChange = await Product.updateOne({_id:productDetails._id},{$set:{ "productSizeWithStock.Medium" : productSizeWithStock.Medium - product.productQuantity}})
            let xLarge=productDetails.productSizeWithStock["xLarge"] - product.productQuantity;
            productDetails.productSizeWithStock={...productDetails.productSizeWithStock, xLarge}
            productDetails.totalProductStock=productDetails.totalProductStock- product.productQuantity;
        }
        await productDetails.save(productDetails);
    })
        await res.json(order);

    } catch (e) {
        console.error(e.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;