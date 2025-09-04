const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the provided URI
 * @param {string} mongodbUri - MongoDB connection URI
 * @throws {Error} If connection fails or URI is invalid
 */
const connectDB = async (mongodbUri) => {
  if (!mongodbUri) {
    throw new Error('MongoDB URI is required');
  }

  try {
    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;
