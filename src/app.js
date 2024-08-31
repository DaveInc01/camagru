const run = require('./connect')
const path = require('path')
const express = require('express')
const PORT = 3000
const app = express()
const register = require('./controllers/register.js')
const jwtVerify = require('./controllers/register.js')
/* Run connection to db */
run().catch(console.dir)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

app.post('/register', register)
app.get('/verify-email/:token', jwtVerify)

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})

