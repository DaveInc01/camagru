const dotenv = require('dotenv').config();
const url = require('node:url');
// const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path');
const {saltRounds, User} = require('../models/user.model')

var login_page_data = {
    email_error_style: 'none',
    password_error_style: 'none'
};


async function authenticateUser (login_data){
    return new Promise(async function(resolve, reject){
        // find by username
        let find_user = await User.findOne({username: login_data.email})
        if (!find_user) 
            find_user = await User.findOne({email: login_data.email})
        if(find_user)
        {
            bcrypt.compare(login_data.password, find_user.password, (err, isMatch)=>{
                if (isMatch){
                    return resolve(find_user)
                }
                else{
                    console.log("err ", err)
                    login_page_data.password_error_style = 'block'
                    return reject()
                }
            })
        }
        else{
            login_page_data.email_error_style = 'block'
            return reject()
        }
    })
}

async function login(req, res){  
    login_page_data.email_error_style = 'none'
    login_page_data.password_error_style = 'none'
    const login_data = await req.body
    await authenticateUser(login_data).then(async (find_user)=>{
        console.log('user was found')
        const token = jwt.sign({ id: find_user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        find_user.token = token
        await find_user.save()
        res.redirect(url.format({
            pathname:"/",
            query: {
                token: token
            }
          })
        )
        // res.render('index', login_page_data)
    }).catch((error)=>{
        console.log(error)
        res.render('login', login_page_data)
        // res.sendFile(login_page_path)
    })
}

module.exports = {
    login,
    login_page_data
}