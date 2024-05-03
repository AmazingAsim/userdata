let userrepo=require('../repo/userrepo');
let path = require('path')
let getusers=async (req,res)=>{
try{
    let result=await userrepo.showusers();
    console.log(result)
    res.send(result)
}
catch(err){
    console.log(err)
    res.send(err);
}
}

let adduser= async (req,res)=>{
    let user=req.body;
    console.log({user:user.username,password:user.password,email:user.email});
     
    try{
           console.log('try initiated');
          let result=await userrepo.adduser(user);
          console.log('inside cojtrol try \n'+result);
          res.send('account created successfully'); 
    }
    catch(err){
         res.send('catch error'+err)
         console.log('catch error in control'+err);
    }
}


let login=async (req,res)=>{
    let user=req.body;
    let validlogin=false;
    try{
        let result=await userrepo.loginuser(user);
        console.log("in login fun"+result);
        if(result=='invalid password' || result=="invalid email"){
            validlogin=false;
            res.json({"res":result,"validlogin":validlogin});
        }
        else{
           validlogin=true;
           res.cookies('jwt',result);
            res.json({"res":result,"validlogin":validlogin,"email":user.email})
           }
      
      
       
    }
    catch(err){
        console.log('error'+err)
        res.send('controller error ooglog'+err);
    }
}

let currentuser=async (req,res)=>{
    let email=req.params.email
  let result= await userrepo.currentuser(email);

  if(result!=null){
      res.send(result)
  }
}

let addProfile = async(req,res)=>{
  if(!req.file){
    res.send('no file is selected');
  }
  else{
    let fileName = req.body._id+path.extname(req.file.originalname);
    let result = await userrepo.addProfile(req.body._id,fileName);
    res.send(result);
  }
}

let getImage = async (req,res)=>{
  res.sendFile(path.join(__dirname,'..','profiles',req.params.profileImage))
}

module.exports={getusers,adduser,login,currentuser,addProfile,getImage}