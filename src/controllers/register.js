const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const PORT = require('../app.js')
// const jwt = dotenv.config()
const emailTransporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.OWNEREMAIL,
    pass: process.env.OWNERPASS
  }
})

async function compareData(user){
  let existing = await User.findOne({username: user.username})
  if(existing != null)
    throw 'Username is already in used'
  existing = await User.findOne({email: user.email})
  if (existing != null)
    throw 'Email is already in used'
  console.log(existing)
}

async function register(req, res){
    const user_data = await req.body
    var emailToken = jwt.sign({
      email: user_data.email
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    const user = new User({
      email: user_data.email,
      username: user_data.username,
      password: user_data.password,
      token: emailToken
    }); 
    // console.log(User.findOne({username: "Davit"}))
    try{
      compareData(user)
    }
    catch(err){
      res.send(err)
    }
    await user.save().then((result)=>{
      const verificationUrl = `http://localhost:${PORT}/verify-email/${emailToken}`;
    const mailOptions = {
      from: process.env.OWNEREMAIL,
      to: user_data.email,
      subject: 'Verify Your Email',
      html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
    }
    try{
      emailTransporter.sendMail(mailOptions)
      res.send('Registration successful, please verify your email.')
    }
    catch(err){
      console.log(err)
      res.send(`The email can't be sent\n${err}`)
    }
    }).catch((err)=>{
      // console.log(err)
      res.send("Can't save User, username or email is not unique")
    })
    
}

function jwtVerify(req,res){
  const {token} = req.params
  console.log(token)
  // const findToken = User.findOne({token})
  // if ()
  // jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
  //   if(err){
  //     console.log(err)
  //     res.send(`It's some error ocured, try to reregiter in camagru.com`)
  //   }
    res.send()
  // })
}
module.exports = {
  register,
  jwtVerify
}