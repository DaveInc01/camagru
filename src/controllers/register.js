const dotenv = require('dotenv');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
// const jwt = dotenv.config()
const emailTransporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: process.env.OWNEREMAIL,
    pass: process.env.OWNERPASS
}
})

async function register(req, res){
    const user_data = await req.body
    // if(User.find())
    const emailToken = jwt.sign({
      email: user_data.email
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    const user = new User({
      email: user_data.email,
      username: user_data.username,
      password: user_data.password
    }); 
    const verificationUrl = `http://localhost:${PORT}/verify-email/${emailToken}`;
    const mailOptions = {
      from: process.env.OWNEREMAIL,
      to: user_data.email,
      subject: 'Verify Your Email',
      html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
    }
    console.log(user_data.email)
    try{
      await emailTransporter.sendMail(mailOptions)
    }
    catch(err){
      console.log(err)
    }
    res.send('Registration successful, please verify your email.')
}

function jwtVerify(req,res){
    const {token} = req.params
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if(err){
        console.log(err)
        res.send(`It's some error ocured, try to reregiter in camagru.com`)
      }
      res.send()
    })
    console.log(err)
}

module.exports = register
module.exports = jwtVerify