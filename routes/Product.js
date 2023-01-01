let express = require('express');
require("dotenv").config();
let router = express.Router();
let Product = require('../models/product');
let Store = require('../models/storeDetails');
let User = require('../models/user');
let jsonwebtoken =require('jsonwebtoken');
const { uploadProductImages } = require('../s3Service/s3Service');
const { S3 } = require("aws-sdk");
var decoder = require('urldecode')
// router.get('/',async(req,res)=>{
//     res.send({data:'testing1'});
// })

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsconfig=process.env.AWS_SDK_LOAD_CONFIG

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    bucketName,
    awsconfig
});

router.post('/addproduct',uploadProductImages.fields([
    {
    name :'productImage1', maxCount:1
    },
    {
    name:'productImage2',maxCount:1
    },
    {
    name: 'productImage3',maxCount:1
    }
]),async (req,res)=>{
    try {
        let id =req.query.id;
        const productImage1 = req.files.productImage1[0].location;
        const productImage2 = req.files.productImage2[0].location;
        const productImage3 = req.files.productImage3[0].location;
    //    console.log(productImage1);
        // console.log(file);
        let product = await new Product(req.body);
        product.productImage1 = productImage1;
        product.productImage2 = productImage2;
        product.productImage3 = productImage3;
        // let data = await jsonwebtoken.verify(req.query.token, "FSD m cat says mioon")
        // let Suser = await User.findById(data.id);
        // let storeData = await Store.find({_id:id});
        // console.log(storeData[0].id);
        // product.store=storeData[0]._id;
        product.store = id
        console.log(product.store);
        await product.save(product);
       await res.json(product);
        
    } catch (e) {
        console.error(e.message);
        res.status(500).json('Server Error');
    }

});
router.get('/allproducts',async(req,res)=>{
    try {
        
        let products = await Product.find();
        res.json(products);
        console.log(products)
    } catch (e) {
        console.error(e.message);
        res.status(500).json('Server Error');
    }
});
router.get('/:_id',async(req,res)=>{
    try {
        let productid = req.params._id
        console.log(productid);
        let singleProduct = await Product.findById(productid);
        res.json(singleProduct);
        
    } catch (e) {
        console.error(e.message);
        res.status(500).json('Server Error');
    }
});

router.delete('/:_id',async(req,res)=>{
    try {

        const deleteItem =[];
        let productid =req.params._id
        console.log(productid);
        let deleteProduct = await Product.findById(productid);
        if(!deleteProduct) res.status(404).json({msg:'product not Found'});
        else{
            deleteItem.push(deleteProduct.productImage1);
            deleteItem.push(deleteProduct.productImage2);
            deleteItem.push(deleteProduct.productImage3);
            console.log(deleteItem);
            deleteItem.forEach(async function(item){
    
                let fileKey = decoder(item)
                const datas = fileKey.split('amazonaws.com/')
                fileKey = datas.pop();
                console.log(fileKey);
                const params = {
                  Bucket: bucketName,
                  Key: fileKey,
                };
                await s3.deleteObject(params).promise();
                
            })
            
        deleteProduct = await Product.findByIdAndDelete(productid);
        console.log(deleteProduct);
        await res.json({msg:"Product Removed",
                        imagesDeleted:deleteItem});

      
        }
    } catch (error) {
        
    }
})
module.exports = router;