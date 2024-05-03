let express=require('express');
let usercontrol=require('../controller/usercontroller')
let userroute=express.Router();
let auth=require('../middleware/auth')
let upload = require('../middleware/multer_middleware')



userroute.get('/getusers',auth.isAdimn,usercontrol.getusers);
userroute.post('/adduser',usercontrol.adduser);
userroute.post('/login',usercontrol.login);
userroute.get('/currentuser/:email',auth.verifytoken,usercontrol.currentuser);

userroute.post('/addProfile',upload.single('profile'),usercontrol.addProfile)
userroute.get('/getimage/:profileImage',usercontrol.getImage)
module.exports=userroute;

