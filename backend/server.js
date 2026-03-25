const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/admissions', require('./routes/admissionRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/', (req, res) => res.send('Little Angels School API Running'));

// Serverless-optimized MongoDB connection
const PORT = process.env.PORT || 5000;

let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }
  try {
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI provided. Running in email-only DB-free mode!');
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error. Certain features will be disabled:', err.message);
  }
};
connectDB();

// Create uploads directory locally if it doesn't exist
const fs = require('fs');
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
