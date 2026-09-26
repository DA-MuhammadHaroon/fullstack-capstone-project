// routes/giftRoutes.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');
const { ObjectId } = require('mongodb');

// GET /api/gifts - Return all gift items
router.get('/api/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// GET /api/gifts/:id - Return a single gift item by ID
router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const item = await db.collection('items').findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Failed to fetch gift' });
  }
});

module.exports = router;