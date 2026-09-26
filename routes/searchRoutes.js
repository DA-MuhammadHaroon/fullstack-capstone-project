// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

// GET /api/search/category - Filter results based on category
router.get('/api/search/category', async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const db = await connectToDatabase();

    // Filter results based on category
    const results = await db.collection('items')
      .find({ category: category })
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Category filter error:', error);
    res.status(500).json({ error: 'Filter failed' });
  }
});

// GET /api/search - Search items by keyword
router.get('/api/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    const db = await connectToDatabase();

    let query = {};
    if (q) query.name = { $regex: q, $options: 'i' };
    if (category) query.category = category;

    const results = await db.collection('items').find(query).toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;