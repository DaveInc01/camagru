const run = require('./connect')
const path = require('path')
const express = require('express')
const PORT = 3000
const app = express()

/* Run connection to db */
run().catch(console.dir)
app.use(express.static('./public/'))

app.get('/register', (req, res)=>{
  res.sendFile(path.join(__dirname, '/public/register.html'))
})
app.post('/register', (req, res)=>{
  console.log(req)
  res.send("REGISTER - POST")
})

app.post('/login', (req, res)=>{
  console.log(req)
  res.status(200)
})

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})

