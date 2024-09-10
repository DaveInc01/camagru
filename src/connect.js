const uri = "mongodb+srv://daveincmine:UayR6rNoBYWMR1so@camagrucluster.lg6pv.mongodb.net/?retryWrites=true&w=majority&appName=CamagruCluster";

const mongoose = require('mongoose');

mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if unable to connect
});