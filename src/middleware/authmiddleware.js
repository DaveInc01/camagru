const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const dotenv = require('dotenv').config();
// const cookieParser = require('cookie-parser');

const JWT_SECRET = process.env.JWT_SECRET
const { login_page_data } = require('../controllers/login.js')
const verifyJwt = async (req, res, next) =>{
    console.log(req.cookies.token)
    const token = req.cookies.token
    if(!token) {
        login_page_data.alert = 'Token is not found'
        return res.status(401).redirect('/login')
    }
    try{
        const decodedToken = await jwt.verify(token, JWT_SECRET)
        req.currentUser = decodedToken
    }
    catch(error){
        login_page_data.alert = 'Token is not match'
        return res.status(401).redirect('/login')
    }
    console.log("Success aut middleware")
    next()
}

module.exports = verifyJwt