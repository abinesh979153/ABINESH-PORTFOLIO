const mongoose = require("mongoose");

// Connects to MongoDB using the URI in the .env file.
// If the connection fails, the server logs the error and exits
// instead of running with a broken database connection.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
