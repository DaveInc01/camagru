const run = require('./connect')
const path = require('path')
const express = require('express')
const PORT = 3000
const app = express()

/* Run connection to db */
run().catch(console.dir)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))

app.post('/register', async (req, res)=>{
  const email = await req.body
  console.log(email)
  res.end()
})

// starts a simple http server locally on port 3000
app.listen(3000, ()=>{
  console.log(`server is listen port:${PORT}`)
})

