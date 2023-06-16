let express=require('express');
let usercontrol=require('../controller/usercontroller')
let userroute=express.Router();
let auth=require('../middleware/auth')

userroute.get('/getusers',auth.isAdimn,usercontrol.getusers);
userroute.post('/adduser',usercontrol.adduser);
userroute.post('/login',usercontrol.login);

userroute.get('/currentuser/:email',auth.verifytoken,usercontrol.currentuser);


module.exports=userroute;

