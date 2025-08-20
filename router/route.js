//import express
const express = require('express')
const usercontroller = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const bookController = require('../controllers/bookController')
const multerMiddleware = require('../middlewares/multerMiddleware')
const jobcontroller = require('../controllers/jobController')
//create an instance
const route = new express.Router()

//API call for register
route.post('/api/register',usercontroller.register)
//API call for login
route.post('/api/login',usercontroller.login)
//API call for google-login
route.post('/api/google-login',usercontroller.googleAuth)
//API for add book
route.post('/api/addBook',jwtMiddleware,multerMiddleware.array('UploadedImages',3),bookController.addBook)
//API fot get book
route.get('/api/homeBooks',bookController.getHomeBooks)
//API for get all books
route.get('/api/allBooks',jwtMiddleware,bookController.getAllBooks)
//API to get a book
route.get('/api/getABook/:id',jwtMiddleware,bookController.getABook)
//API for aproval of books
route.get('/api/admin-allBooks',jwtMiddleware,bookController.getAllBookAdminController)
//API call for admin book approve
route.put('/api/admin-approvedBook',jwtMiddleware,bookController.approveBooksAdminController)
//API call to get users
route.get('/api/admin-allUsers',jwtMiddleware,usercontroller.getAllUsersAdminController)



//Jobs-Admin
//API to post a job
route.post('/api/admin-addJobs',jwtMiddleware,jobcontroller.addJobs)
//API to get all jobs
route.get('/api/admin-allJobs',jwtMiddleware,jobcontroller.getAllJobs)
//API to delete a job
route.get('/api/admin-deleteJobs/:id',jwtMiddleware,jobcontroller.deleteJobs)


//API for update admin profile
route.put('/api/updateAdmin',jwtMiddleware,multerMiddleware.single('profile'),usercontroller.updateAdminDetails)
//API for get admindetails
route.get('/api/admin-Details',jwtMiddleware,usercontroller.getAdminDetails)


//payment
route.put('/api/make-payment',jwtMiddleware,bookController.makepayment)

//export the route
module.exports = route