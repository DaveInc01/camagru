const mongoose = require('mongoose')
const md5 = require('md5')

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
userSchema.pre('save', function (next){
    const user = this

    if(!user.isModified('password'))
    {
        console.log("User password don't need to be hashed!")
        return next()
    }
    
    console.log("User password has been hashed!")
    user.password = md5(user.password)
    next()
}) 

const User = mongoose.model('User', userSchema)
module.exports = User