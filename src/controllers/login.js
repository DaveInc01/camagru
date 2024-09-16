// const dotenv = require('dotenv').config();
// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
// const User = require('../models/user.model')
// const md5 = require('md5')

async function login(req, res){
    const login_data = await req.body
    console.log(login_data)
    res.send("LOGIN")
}

module.exports = login