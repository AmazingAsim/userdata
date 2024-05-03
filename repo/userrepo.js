const usermodel = require("../model/usermodel");
let bcrypt=require('bcryptjs')
let jwt=require('jsonwebtoken');
const { ObjectId } = require("mongodb");


let showusers=()=>{
    return usermodel.find();
}


let adduser= async (user)=>{
   console.log('repo adduser executed');
   let salt=await bcrypt.genSalt(10);
   let hashpass=await bcrypt.hash(user.password,salt);

   let userref=new usermodel({
       username:user.username,
       password:hashpass,
       email:user.email,
       usertype:user.usertype

   })
   console.log(user);

   return userref.save()
}


let loginuser=async (user)=>{
     let result=await usermodel.findOne({email:user.email});
      
     console.log("result in repo"+result)

     if(result==null){
           return 'invalid email'
     }
      

     let validpassword=await bcrypt.compare(user.password,result.password);

     if(!validpassword){
         return 'invalid password'
     }
     let payload={id:result._id,email:result.email,usertype:result.usertype};
     let token=await jwt.sign(payload,'batman');
     return token;
}     


let currentuser=(email)=>{
    return usermodel.findOne({email:email});
}


let addProfile = (id,profileImage)=>{
    return usermodel.updateOne({_id:ObjectId(id)},{profileImage:profileImage})
}

module.exports={showusers,adduser,loginuser,currentuser,addProfile};