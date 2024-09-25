// const dotenv = require('dotenv').config();
// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path');
const {saltRounds, User} = require('../models/user.model')

var login_page_data = {
    email_error_style: 'none',
    password_error_style: 'none'
};

async function authenticateUser (login_data){
    return new Promise(async function(resolve, reject){
        const hashed_pass = await bcrypt.hash(login_data.password, saltRounds)
        // find by username
        let find_user = await User.findOne({username: login_data.email})
        if(find_user){
            if(find_user.password === hashed_pass)
                return resolve(find_user)
            else{
                login_page_data.password_error_style = 'block'
                return reject("Password doesn't match")
               
            }
        }
        // find by email
        find_user = await User.findOne({email: login_data.email})
        if(find_user){
            if(find_user.password === hashed_pass)
                return resolve(find_user)
            else{
                login_page_data.email_error_style = 'none'
                login_page_data.password_error_style = 'block'
                return reject("Password doesn't match")
            }
        }
        login_page_data.email_error_style = 'block'
        return reject("Login doesn't match")
    })
}

async function login(req, res){  
    login_page_data.email_error_style = 'none'
    login_page_data.password_error_style = 'none'
    const login_data = await req.body
    await authenticateUser(login_data).then(async (find_user)=>{
        console.log('user was found')
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token
        await user.save()
        res.render('index', login_page_data)
    }).catch((error)=>{
        console.log(login_page_data)
        res.render('login', login_page_data)
        // res.sendFile(login_page_path)
    })
}

module.exports = {
    login,
    login_page_data
}