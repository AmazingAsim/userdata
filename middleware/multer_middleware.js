let multer = require('multer');
let path = require('path')

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./profiles')
    },
    filename:function(req,file,cb){
        cb(null,req.body._id+path.extname(file.originalname));
    },
});

const upload = multer({storage:storage});

module.exports = upload;