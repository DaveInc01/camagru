// const dotenv = require('dotenv').config();
// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
// const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const path = require('path');
const {saltRounds, User} = require('../models/user.model')


async function login(req, res){
    const home_page_path = path.join(__dirname, '../public/index.html');
    const login_page_path = path.join(__dirname, '../public/login.html');
    console.log(__dirname)
    const login_data = await req.body
    let find_user = await User.findOne({username: login_data.email})
    if(!find_user)
        find_user = await User.findOne({email: login_data.email})
    if(find_user)
    {
        const isMatch = await bcrypt.hash(login_data.password, saltRounds)
        if(find_user.password === isMatch)
        {
            console.log("Login was succesfull")
            res.sendFile(home_page_path)
        }
        else{
            console.log("Password is incorect")
            return res.sendFile(login_page_path)
        }
    }
    console.log("Username or email is incorrect")
    res.sendFile(login_page_path)
}

module.exports = login