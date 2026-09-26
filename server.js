// server.js
const app = require('./app');
const { connectToDatabase } = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();