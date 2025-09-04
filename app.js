const express = require('express');
const morgan = require("morgan");

const authRoutes = require('./src/routes/auth.routes'); // Import auth routes
const taskRoutes = require('./src/routes/task.routes');  // Import task routes

require('dotenv').config();

const app = express();

const dev_url = process.env.DEV_URL
const allowed = [
  dev_url
];

// Enable CORS for all routes
app.use(require("cors")({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON bodies


app.use(morgan("dev")); // Logs requests in 'dev' format


app.get('/', (req, res) => {
  res.send('Welcome to Tasks Management System API');
});

// Global error-handling middleware to catch unhandled errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// Register routes to app
app.use('/api/v1', authRoutes); // Mount the auth routes
app.use('api/v1', taskRoutes); // Mount the task routes

module.exports = app;
