const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database: ${mongoose.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
