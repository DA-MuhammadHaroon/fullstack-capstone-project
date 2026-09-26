// db.js — MongoDB Connection File
const { MongoClient } = require('mongodb');

// MongoDB connection URL
// Local: mongodb://localhost:27017
// Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net
const url = 'mongodb://localhost:27017';
const dbName = 'giftlink';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// Export the client and connection function
module.exports = { client, connectToDatabase };