const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const verifyJwt = async (req, res, next) =>{
    const header = req.header
    console.log(header)
}