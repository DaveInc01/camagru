const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if unable to connect
});