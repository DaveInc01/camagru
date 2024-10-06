const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
const verifyJwt = async (req, res, next) =>{
    const token = req.body.token || req.query.token 
    || req.headers["x-acces-token"]
    console.log("Token - ", token)
    if(!token) {
        res.status(401).send("Invalid Token provided")
    }
    
    try{
        const decodedToken = await jwt.verify(token, JWT_SECRET)
        req.currentUser = decodedToken
    }
    catch(error){
        return res.status(401).send("Invalid Token provided")
    }
    next()
}

module.exports = verifyJwt