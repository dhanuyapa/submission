const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fname : {
        type : String,
        required: true
    },
    lname : {
        type : String,
        required: true
    },
    accYear : {
        type : String,
        required : true
    },
    registrationNo : {
        type : String,
        required : true
    },
    indexNo: {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
    }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
