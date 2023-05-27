// require multer a package for uploading files
const multer = require ('multer')
const path = require ('path')

// define storage for multer images
const storage =  multer.diskStorage({
    // destination for files
    destination: (req,file, callback)=>{
       callback(null,path.join(__dirname,"../public/passportImages")) 
    },

    // add back the extension
    filename : (req,file,callback)=>{
        callback(null, Date.now() + file.originalname)
    },

})

// upload parameters for multer
const upload = multer({
    storage:storage,
    limits:{
        fieldSize : 1024*1024*2 // so set it to max of 2Mb
    }
})

module.exports = upload;