// routes/index.js
const express = require('express');
const router = express.Router();

// Import natural npm package (Task 8 requirement)
const natural = require('natural');

// Import sentiment analyzer
const { analyzeSentiment } = require('../sentiment');

// Test route
router.get('/api/sentiment/test', (req, res) => {
  const result = analyzeSentiment('This item is amazing and I love it!');
  res.json(result);
});

module.exports = router;