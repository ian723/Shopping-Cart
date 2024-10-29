// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace for debugging
  res.status(500).json({ error: 'Something went wrong!' }); // Send generic error response
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
