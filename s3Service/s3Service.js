const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
const multer = require('multer');
const { S3 } = require("aws-sdk");
// const course = require("../db/models/course");
const Store = require('../models/storeDetails');
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require('uuid').v4;
require("dotenv").config();


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const awsconfig=process.env.AWS_SDK_LOAD_CONFIG
// const accessKeyId = process.env.accessKeyId;
// const secretAccessKey = process.env.secretAccessKey;

const s3 = new S3({
            region,
            accessKeyId,
            secretAccessKey,
            bucketName,
            awsconfig
});



exports.upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: bucketName,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, `userImages/${uuid()}-${req.body.name}-${file.originalname}`)
        }
    })
})

exports.uploadStoreLogo = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: bucketName,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, `StoreLogos/${req.body.storeName}-Logo`);
        }
    })
})
exports.uploadProductImages = multer({
    storage: multerS3({
        s3: s3,
        // acl: "public-read",
        bucket: bucketName,
        key:async function (req, file, cb) {
            console.log(file);
            const store = await Store.findById(req.query.id);
        //   await  cb(  console.log(course.courseName));
          await cb(null, `${store.storeName}/${file.fieldname}-${file.originalname}-${uuid()}`)
        }
    })
})

// exports.uploadCourseVideo = multer({
//     storage: multerS3({
//         s3: s3,
//         // acl: "public-read",
//         bucket: 'coursera-clone-app',
//         key: function (req, file, cb) {
//             console.log(file);
//             console.log(req.body.courseName);
//             cb(null, `CourseImages/${uuid()}-${req.body.courseName}-${file.originalname}`)
//         }
//     })
// })

// exports.uploadVideos = async (file) => {
//     const s3 = new S3({
//         region,
//         accessKeyId,
//         secretAccessKey
//     });
  
//     const param = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `userImage/${req.body.name}-${file.originalname}`,
//         Body: file.buffer,
//         };
  
//     // return await s3.upload(param).promise();
//         return await s3.upload(param).promise();
//   };


// exports.s3Uploadv3 = async (files) => {
//     const s3 = new S3Client({
//         region,
//         accessKeyId,
//         secretAccessKey,
//         bucketName
//     });
  
//     const params = files.map((file,req,res) => {
//         return{
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key:`${course.courseName}/ModuleVideos/${uuid()}-${file.originalname}`,
//         Body: file.buffer,
//         }
//     });
    
  
//     // return await s3.upload(param).promise();
//         return await params.map((param=>s3.send(new PutObjectCommand(param))));
//   };


// exports.s3Uploadv3 = async (file) => {
//     const s3 = new S3Client({
//         region,
//         accessKeyId,
//         secretAccessKey,
//         bucketName
//     });
  
//     const param = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${req.body.name}-${req.body.courseName}/${req.body.moduleName}/${uuid()}-${file.originalname}`,
//         Body: file.buffer,
//     };
    
  
//     // return await s3.upload(param).promise();
//         return await s3.send(new PutObjectCommand(param));
//   };