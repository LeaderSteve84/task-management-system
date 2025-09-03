const express = require('express');
const morgan = require("morgan");

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
// Register routes here

module.exports = app;
