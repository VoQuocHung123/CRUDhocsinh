const controllers = require("../controllers/students.controllers");
const cors = require('cors')
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
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true)
    }else{
        callback("ERROR")
    }
}
const upload = multer({storage : multerConfig,fileFilter: isImage})
function route(app){
    app.use(cors())

    app.get('/students',controllers.getStudents);

    app.get('/student/:id',controllers.getStudentById);

    app.post('/add-student',upload.single('avatar'),controllers.postStudent);

    app.put('/update-student/:id',upload.single('avatar'),controllers.putStudent);

    app.delete('/student/:id',controllers.deleteStudent);
}
module.exports = route