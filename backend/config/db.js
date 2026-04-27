const mongoose = require("mongoose");

/**
 * Logic for connecting to MongoDB.
 * We use a try-catch block to handle connection errors gracefully.
 */
const connectDB = async () => {
  try {
    // We fetch the Mongo URI from our environment variables for security
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If the database connection fails, the server should not continue running
    process.exit(1);
  }
};

module.exports = connectDB;
