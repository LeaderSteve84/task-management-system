const mongoose = require('mongoose');

const connectDB = async (mongodb_uri) => {
    try {
        await mongoose.connect(mongodb_uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectDB;
