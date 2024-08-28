const run = require('./connect')
const path = require('path')
const express = require('express')
const PORT = 3000
const dotenv = require('dotenv');
const app = express()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
dotenv.config()
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OWNEREMAIL,
    pass: process.env.OWNERPASS
  }
})

/* Run connection to db */
run().catch(console.dir)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

app.post('/register', async (req, res)=>{
  const user = await req.body
  const emailToken = jwt.sign({
    email: user.email
  }, process.env.JWT_SECRET, {expiresIn: '1h'});
  const verificationUrl = `http://localhost:${PORT}/verify-email/${emailToken}`;
  const mailOptions = {
    from: process.env.OWNEREMAIL,
    to: user.email,
    subject: 'Verify Your Email',
    html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
  }
  console.log(user.email)
  try{
    await emailTransporter.sendMail(mailOptions)
  }
  catch(err){
    console.log(err)
  }
  res.send('Registration successful, please verify your email.')
})

app.get('/verify-email/:token', (req,res)=>{
  const {token} = req.params
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
    if(err){
      console.log(err)
      res.send(`It's some error ocured, try to reregiter in camagru.com`)
    }
    res.send()
  })
})

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})

