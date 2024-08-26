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
  }, 'your_secret', {expiresIn: '1h'});
  const verificationUrl = `http://yourdomain.com/verify-email?token=${emailToken}`;
  console.log(process.env.OWNEREMAIL)
  console.log(emailTransporter)
  const mailOptions = {
    from: process.env.OWNEREMAIL,
    to: user.email,
    subject: 'Verify Your Email',
    html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
  }
  await emailTransporter.sendMail(mailOptions)
  res.send('Registration successful, please verify your email.')
})

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})

