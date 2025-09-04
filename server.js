const app = require('./app');
const connectDB = require("./src/db/dbConnection");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Start the server and connect to MongoDB
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(MONGO_URI);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Exit process on failure
  }
};

// Handle server startup errors (e.g port in use)
app.on('error', (error) => {
  console.error('Server error:', error.message);
  process.exit(1);
});

startServer();
