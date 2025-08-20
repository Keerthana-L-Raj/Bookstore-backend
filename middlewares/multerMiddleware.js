//1 import middleware - multer
const multer  = require('multer')

//2 create storage and filename
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //The name in which file should be saved
    filename:(req,file,callback)=>{
        const fname=`img-${file.originalname}`
        callback(null,fname)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback (new Error('Accept only png,jpg or jpeg only'))
    }
}

//config creation
const multerConfig = multer({
    storage,
    fileFilter
})

module.exports=multerConfig
