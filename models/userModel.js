//import mongoose
const mongoose = require('mongoose')

//create a schema and model
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    profile:{
        type : String,
        default : ""
    },
    bio:{
        type : String,
        default : "Bookstore user"
    }
})

module.exports = mongoose.model("users", userSchema)