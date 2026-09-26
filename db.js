const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'giftlink';
const client = new MongoClient(url);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    return client.db(dbName);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

module.exports = { client, connectToDatabase };