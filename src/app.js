// const run = require('./connect')
const path = require('path')
const express = require('express')
const PORT = 3000
const app = express()
const {register, jwtVerify} = require('./controllers/register.js')

const mongoose = require('mongoose');
const uri = "mongodb+srv://daveincmine:UayR6rNoBYWMR1so@camagrucluster.lg6pv.mongodb.net/?retryWrites=true&w=majority&appName=CamagruCluster";

mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if unable to connect
});

/* Run connection to db */
// run().catch(console.dir)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.post('/register', register)
app.get('/verify-email/:token', jwtVerify)

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})  

exports.PORT = PORT

