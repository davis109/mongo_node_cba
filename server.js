const express = require('express');
const bodyParser = require('body-parser');
const tutorialsRouter = require('./routes/tutorials');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tutorial API!' });
});

// Routes
app.use('/api/tutorials', tutorialsRouter);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});