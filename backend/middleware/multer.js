const multer = require('multer')

const multerConfig = multer.diskStorage({
    destination :(req,file,callback)=>{
        callback(null,'./public/avatar/')
    },
    filename: (req,file,callback)=>{
        const ext = file.mimetype.split('/')[1]
        callback(null,`avatar-${Date.now()}.${ext}`)
    }
})

module.exports = multer({storage : multerConfig})