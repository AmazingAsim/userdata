let mongoose=require('mongoose');

let userschema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    usertype:{type:String,required:true},
    profileImage:{type:String,require:false}
})

let usermodel=mongoose.model('users',userschema)

module.exports=usermodel;