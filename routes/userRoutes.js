// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const { ObjectId } = require('mongodb');

// GET /api/users - List all users
router.get('/api/users', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const users = await db.collection('users')
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get single user
router.get('/api/users/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({
      _id: new ObjectId(req.params.id)
    }, { projection: { password: 0 } });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// TASK 6: Filter items by category
router.get('/api/items/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const db = await connectToDatabase();

    // Filter results based on category
    const items = await db.collection('items')
      .find({ category: category })
      .toArray();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter items' });
  }
});

module.exports = router;