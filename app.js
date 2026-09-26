// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' folder (for landing page)
app.use(express.static(path.join(__dirname, 'public')));

// ============ IMPORT ROUTES ============
const giftRoutes = require('./routes/giftRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// ============ USE ROUTES ============
app.use(giftRoutes);
app.use(userRoutes);
app.use(searchRoutes);
app.use(authRoutes);

// ============ TASK 7: /api/search ROUTE ============
// This route serves search results (with optional category and keyword filters)
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

// ============ HEALTH CHECK / API INFO ============
// This route returns API status (when accessed via /api)
app.get('/api', (req, res) => {
  res.json({ message: 'GiftLink API is running' });
});

// ============ FALLBACK: Serve landing page for all other routes ============
// If no API route matches, serve the landing page (index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;