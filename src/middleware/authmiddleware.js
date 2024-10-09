const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
const { login_page_data } = require('../controllers/login.js')
const verifyJwt = async (req, res, next) =>{
    const token = req.body.token || req.query.token 
    || req.headers["x-acces-token"]
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
    next()
}

module.exports = verifyJwt