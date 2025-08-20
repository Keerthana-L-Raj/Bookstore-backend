//import dotenv file
require('dotenv').config()//Loads .env
//1 import express
const express = require('express')

//5 import cors
const cors = require('cors')

//8 Import router
const route = require('./router/route')

//import db
const db = require('./config/db')

//import appMiddleware
const appMiddleware = require('./middlewares/appMiddleware')

//2 Create a server app using  express
const bookServer = express()
//3 Define port
PORT = 3000 || process.env.PORT

//6 implementing cors
bookServer.use(cors())

//7 implementing middleware 
bookServer.use(express.json()) //--->//express.json is a application level middleware
//bookServer.use(appMiddleware)
bookServer.use(route)
bookServer.use('/upload',express.static('./uploads'))

//4 Server listen 
bookServer.listen(PORT,()=>{
    console.log("Book server Listening on the port ",PORT);
    
})