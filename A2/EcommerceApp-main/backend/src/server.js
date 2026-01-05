const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors =require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Models
const { Product } = require('./models/Product');
const { User } = require('./models/User');
const { Order } = require('./models/Order');
const { Cart } = require('./models/Cart');

// Routes
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const stateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({ ok: true, dbState: stateMap[state] || 'unknown', dbStateCode: state });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


