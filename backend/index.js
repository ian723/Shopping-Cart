// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
