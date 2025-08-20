//import mongoose
const mongoose = require('mongoose')

//create a schema and model
const bookSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true
    },
    noofpages:{
        type : Number,
        required : true
    },
    imageUrl:{
        type : String,
        required : true
    },
    price:{
        type : String,
        required : true
    },
    dprice:{
      type : Number,
        required : true  
    },
    abstract:{
       type : String,
        required : true  
    },
    publisher:{
         type : String,
        required : true 
    },
    language:{
          type : String,
        required : true
    },
    isbn:{
         type : String,
        required : true
    },
    category:{
         type : String,
        required : true
    },
    UploadedImages:{
         type:Array,
         require:true
    },
    status:{
         type : String,
        default:"pending"
    },
    userMail:{
         type : String,
        required : true
    },
    brought:{
         type : String,
        default:""
    }
})

module.exports = mongoose.model("books", bookSchema)