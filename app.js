// app.js
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const giftRoutes = require('./routes/giftRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use(giftRoutes);
app.use(userRoutes);
app.use(searchRoutes);
app.use(authRoutes);

// TASK 7: Route that serves /api/search
app.get('/api/search', async (req, res) => {
  try {
    const { category, q } = req.query;
    const db = await connectToDatabase();
    let query = {};

    if (category) {
      query.category = category;
    }
    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }

    const results = await db.collection('items').find(query).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'GiftLink API is running' });
});

module.exports = app;