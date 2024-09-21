// const run = require('./connect')
let ejs = require('ejs');
const dotenv = require('dotenv').config();
const path = require('path')
const express = require('express')
const PORT = process.env.PORT
const app = express()
const {register, jwtVerify} = require('./controllers/register.js')
const login = require('./controllers/login.js')
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
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); // Set EJS as the templating engine

app.use(express.static(__dirname + '/views/'))
app.use(express.urlencoded({extended: true}))
app.get('/register', (req, res)=>{
  res.render('register')
})
app.get('/login', (req, res)=>{
  const data = { username: 'JohnDoe' };
  res.render('login', data)
})
app.post('/register', register)
app.post('/login', login)
app.get('/verify-email/:token', jwtVerify)

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})  

