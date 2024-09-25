const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config();
const saltRounds = Number(process.env.SALTROUNDS)

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
// middleware for hashing password when has been user.save()
userSchema.pre('save', async function (next){
    const user = this

    if(!user.isModified('password'))
    {
        console.log("User password don't need to be hashed!")
        return next()
    }
    
    console.log("User password has been hashed!")
    user.password = await bcrypt.hash(user.password, saltRounds)
    next()
}) 

const User = mongoose.model('User', userSchema)
// User.collection.drop({email: 0})
module.exports = {
    User,
    saltRounds
}