const app = require('../backend/server.js');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    if (!process.env.MONGO_URI) {
       return res.status(500).json({ error: 'DATABASE_URI_MISSING', message: 'Please add MONGO_URI to Vercel Environment Variables' });
    }
    await mongoose.connect(process.env.MONGO_URI);
  }
  return app(req, res);
};
