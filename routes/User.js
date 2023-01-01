let express = require('express');
let router = express.Router();
let User = require('../models/user');
const {upload} =require('../s3Service/s3Service');
let jsonwebtoken = require('jsonwebtoken');

// router.get('/',async(req,res)=>{
//     res.send({data:'testing'});
// })


router.post('/signup',upload.single('userImage'),async(req,res)=>{
try {
    console.log(req.body);
    console.log(req.file);
    let userpic= await req.file.location;
    let user =new User(req.body);
    user.userImage=userpic;
    console.log(user.userImage);
    let useremail =await User.findOne({email:req.body.email});
    if(useremail){
        res.send("User Already Exists");
        console.log("User Already Exists");
    }
    else{
        await user.save(user);
        await res.send({result:user});
    }
} catch (error) {
    res.send(error);
}

});

router.post('/login', async (req, res)=>{

    let user =  await User.findOne(req.body);
    console.log(user);
   
             if(user){

                    jsonwebtoken.sign({
                        id:user._id
                    },"FSD m cat says mioon", {
                        expiresIn:"2h"
                    }, (err, UserToken)=>{
                        res.json({
                            token:UserToken,
                            user:user
                        });
                    })

            }else{
                    res.json("User Not Found");
                }


 });

 router.get('/session-check', async (req, res)=>{

    try{

        let data = await jsonwebtoken.verify(req.query.token, "FSD m cat says mioon")

        let user = await User.findById(data.id);

        // let user = users.find(user=>user.id == data.id);
        
        res.json(user);
    }catch(e){
        res.json(null);
    }

});

module.exports = router;