const Students = require('../models/students.modal')
const pageSize = 2
class StudentsControllers {
    // GET students
    async getStudents(req, res) {
        try {
            let page = Number(req.query.page)
            if(page){
            let skipPage = (page-1)*pageSize
            const students = await Students.find({})
            .skip(skipPage)
            .limit(pageSize)
            res.status(200).json(students.reverse())
            }else{
                const students = await Students.find({})
                res.status(200).json(students)
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
    //GET by id
    async getStudentById(req, res) {
        try {
            const student = await Students.findById({ _id: req.params.id })
            res.status(200).json(student)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    //POST add student
    async postStudent(req, res) {
        try {
            const student = await Students.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                classname: req.body.classname,
                avatar: req.file.filename
            })
            res.status(200).json(student)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    // PUT update student
    putStudent(req, res) {
        let value = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            classname: req.body.classname,
        }
        if (typeof (req.file) != "undefined") value.avatar = req.file.filename
        Students
            .findByIdAndUpdate(req.body._id, value)
            .exec(err => {
                if (err) return res.status(500).send(err)
                Students
                    .findById(req.body._id)
                    .then(newStudent => res.status(200).json(newStudent))
            })
    }
    // DELETE student
    async deleteStudent(req, res) {
        try {
            await Students.deleteOne({ _id: req.params.id })
            res.status(200).send("Delete Succesfully")
        } catch (err) {
            res.status(500).send(err)
        }
    }
}
module.exports = new StudentsControllers()