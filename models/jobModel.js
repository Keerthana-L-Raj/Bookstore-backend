//import mongoose
const mongoose = require('mongoose')

//create a schema and model
const jobSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    location:{
         type : String,
        required : true
    },
    jobType:{
         type : String,
        required : true
    },
    salary:{
         type : String,
        required : true
    },
    qualification:{
         type : String,
        required : true
    },
    experience:{
         type : String,
        required : true
    },
    description:{
         type : String,
        required : true
    },
})
module.exports = mongoose.model("jobs", jobSchema)