const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes'); // Import authentication routes
const taskRoutes = require('./src/routes/task.routes');  // Import task management routes

const app = express();

// Configure CORS with allowed origins
const allowedOrigin = process.env.DEV_URL ? [process.env.DEV_URL] : [];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowed.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Logs HTTP requests in development format
app.use(morgan("dev"));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Task Management System API'
  });
});

// Mount API route
app.use('/api/v1', authRoutes); // Auth routes (/api/v1/register, /api/v1/login)
app.use('/api/v1', taskRoutes); // Task route (/api/v1/tasks)

// Global error-handling middleware to catch unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

module.exports = app;
