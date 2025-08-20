//import mongoose
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("Server is connected to mongoDB");
}).catch((err)=>{
    console.log("MongoDB connection Error", err);
    
})