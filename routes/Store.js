let express = require('express');
let router = express.Router();
let Store = require('../models/storeDetails');
let User = require('../models/user');
let jsonwebtoken = require('jsonwebtoken');

const { uploadStoreLogo } = require('../s3Service/s3Service');

// router.get('/',async(req,res)=>{
//     res.send({data:'testing3'});
// })

router.post('/createstore',uploadStoreLogo.single('storeLogo'),async(req,res)=>{
   try {

        let id = req.params.id;
       let store = await new Store(req.body);
       store.storeLogo = await req.file.location;
       let data = await jsonwebtoken.verify(req.query.token, "FSD m cat says mioon")
        let Suser = await User.findById(data.id);
        store.user = Suser.id;
       await store.save();
        res.json(store);
    
   } catch (e) {
    console.error(e.message);
        res.status(500).json('Server Error');
   }
   
});

router.get('/:storeId',async(req,res)=>{
     try {    
        let storeid = req.params.storeId
        let store = await Store.findById(storeid);
         console.log(req.params.storeId)
         console.log(store)        
         res.json(store);
     } catch (e) {
         console.error(e.message);
         res.status(500).json('Server Error');
     }
 });

// router.get('/',async(req,res)=>{
//     const store = await Store.find().populate({
//         path:'user',
//         select:'name email role'

//     })
//     res.json({store:store});
// })
module.exports = router;