// const dotenv = require('dotenv').config();
// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path');
const {saltRounds, User} = require('../models/user.model')
// const toggle_error_info = require('../public/scripts/auth.js')

async function authenticateUser (login_data){
    return new Promise(async function(resolve, reject){
        let find_user = await User.findOne({username: login_data.email})
        if(!find_user)
            find_user = await User.findOne({email: login_data.email})
        if(find_user)
        {
            const isMatch = await bcrypt.hash(login_data.password, saltRounds)
            if(find_user.password === isMatch)
            {
                console.log("Login was succesfull")
                resolve(find_user)
                // res.sendFile(home_page_path)
            }
            else{   
                console.log("Password is incorect")
                reject('pass-error')
                // return res.sendFile(login_page_path)
            }
        }
        reject('email-error')
    })
}

async function login(req, res){  
    const home_page_path = path.join(__dirname, '../public/index.html');
    const login_page_path = path.join(__dirname, '../public/login.html');
    console.log(__dirname)
    const login_data = await req.body
    await authenticateUser(login_data).then(async (find_user)=>{
        console.log('user was found')
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token
        await user.save()
        res.sendFile(home_page_path)
    }).catch((error_id)=>{
        res.sendFile(login_page_path)
        console.log(error_id)
        // toggle_error_info(error_id)
    })

}

module.exports = login