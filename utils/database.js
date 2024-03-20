// Import the Mongoose library
const mongoose = require("mongoose");

// Define a Database class
class Database {
  // Method to establish a connection to the MongoDB database
  static connect() {
    mongoose
      .connect(process.env.MONGODB_URI) // Connect to the MongoDB URI specified in the environment variables
      .then(console.log("Connected to the database")); // Log a message indicating successful connection
  }
}

// Export an instance of the Database class
module.exports =Database;
