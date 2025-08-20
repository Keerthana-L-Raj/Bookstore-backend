const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
//Logic for API calls
//1. Register
exports.register = async (req, res) => {
  //collect data from request body - destructuring
  const { username, email, password } = req.body

  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) { //error
      res.status(401).json("User already existing...")
    }
    else {
      const newUser = new users({ username, email, password })
      await newUser.save()
      res.status(200).json(newUser)
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
}


//Login
exports.login = async (req, res) => {
  //collect data from request body -destructuring
  console.log("inside login");

  const { email, password } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if (!existingUser) {
      res.status(401).json('You are not registered')
    }
    else if (existingUser.password !== password) {
      res.status(401).json('Your password is incorrect')
    }
    else {
      //token generation
      const token = jwt.sign({ userMail: existingUser.email }, 'superkey2025')
      console.log(token);

      res.status(200).json({ existingUser, token })//login success
    }
  }
  catch (err) {
    res.status(500).json(console.error())
  }
}

//google-login
exports.googleAuth = async (req, res) => {
  //collect data from request body -destructuring
  const { username, email, password, photo } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      //token generation
      const token = jwt.sign({ userMail: existingUser.email }, 'superkey2025')
      console.log(token);
      res.status(200).json({ existingUser, token });//login success
    }

    else {

      //first time-google auth
      const newUser = new users({
        username, email, password, profile: photo,
      });
      await newUser.save();//save to mongodb
      //token gen
      const token = jwt.sign({ userMail: newUser.email }, "superkey2025");
      console.log(token);

      res.status(200).json({ existingUser: newUser, token });//login success

    }
  }
  catch (err) {
    res.status(500).json(console.error())
  }

}



exports.getAllUsersAdminController = async (req, res) => {
  try {
    const allExistingUser = await users.find()
    res.status(200).json(allExistingUser)
  }
  catch (err) {
    res.status(500).json("Err" + err)
  }
}


exports.updateAdminDetails = async (req, res) => {
  console.log("Inside Admin profile update");
  const { username, password, profile } = req.body
  const pro = req.file ? req.file.filename : profile
  const email = req.payload.userMail
  console.log(username, password, pro, email);
  try {
    const adminDetails = await users.findOneAndUpdate({ email }, { username, email, password, profile: pro }, { new: true })
    await adminDetails.save()
    res.status(200).json(adminDetails)
  }
  catch (err) {
    res.status(500).json("Err" + err)
  }
}


exports.getAdminDetails = async (req, res) => {
  console.log("Admin details");
  
  const email = req.payload.userMail
  try {
    const adminDetails = await users.find({ email, bio: "admin" })
    if (!adminDetails) {
      res.status(404).json({ message: "Not found" })
    }
    else{
    res.status(200).json(adminDetails)
    }
  }
  catch (err) {
   res.status(500).json("Err"+err)
  }
}