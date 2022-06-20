const controllers = require("../controllers/students.controllers");
const cors = require('cors')
const validator = require('../middleware/validator')
const upload = require('../middleware/multer')

function route(app){
    app.use(cors())

    app.get('/students',controllers.getStudents);

    app.get('/student/:id',controllers.getStudentById);

    app.post('/add-student',upload.single('avatar'),validator.validate,controllers.postStudent);

    app.put('/update-student/:id',upload.single('avatar'),validator.validate,controllers.putStudent);

    app.delete('/student/:id',controllers.deleteStudent);
}
module.exports = route