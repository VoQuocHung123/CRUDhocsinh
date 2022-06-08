const Students = require('../modals/students.modal')

class StudentsControllers{
    //GET students
    getStudents(req,res){
        Students.find({},(err,student)=>{
            if(err) return res.status(500).send(err)
            res.status(200).json(student)
        })
    }
    //GET student by ID
    getStudentById(req,res){
        Students.findById({_id: req.params.id},(err,student)=>{
            if(err) return res.status(500).send(err)
            res.status(200).json(student)
        })
    }
    //POST add student
    postStudent(req,res){
        Students.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            class: req.body.class,
            avatar: req.file.filename
        },(err,student)=>{
            if(err) return res.status(500).send(err)
            res.status(200).json(student)
        })
    }
    //PUT update student
    putStudent(req,res){
        let value ={
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            class: req.body.class,
        }
        if(typeof(req.file)!= "undefined") value.avatar = req.file.filename
        const a = Students
        .findByIdAndUpdate( req.body._id,value)
        .exec(err =>{
            if(err) return res.status(500).send(err)
            Students
            .findById(req.body._id)
            .then(newStudent => res.status(200).json(newStudent) )
        })
    }
    //DELETE student
    deleteStudent(req,res){
        Students.deleteOne({_id: req.params.id},(err,student)=>{
            if(err) return res.status(500).send(err)
            res.status(200).json("Delete Succesfully")
        })
    }
}
module.exports = new StudentsControllers()