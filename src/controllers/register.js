const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')
const PORT = process.env.PORT

const emailTransporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.OWNEREMAIL,
    pass: process.env.OWNERPASS
  }
})

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
    await user.save().then((result)=>{
      const verificationUrl = `http://localhost:${PORT}/verify-email/${emailToken}`;
      console.log(verificationUrl)
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
      console.log(err)
      res.send("Can't save User, username or email has already been used")
    })
}

async function jwtVerify(req,res){
  const {token} = req.params
  console.log(token)
  const findUser = await User.findOne({token: token})
  if(findUser)
  {
    findUser.confirmed = true
    await findUser.save()
    res.send(`<h1>Confirmation has been successfull, you can go now to <a href="http://localhost:${PORT}">Camagru.com</a></h1>`)
  }
  else{
    res.send('<h1>Token was not found or expired, try to register again</h1>')
  }
}
module.exports = {
  jwtVerify,
  register,
}