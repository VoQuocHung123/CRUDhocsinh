const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/students')
const Student = new Schema({
    firstname: String,
    lastname: String,
    age: Number,
    class : String,
    avatar: String
})
module.exports = mongoose.model('Student',Student)