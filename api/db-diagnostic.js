const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    return res.status(500).json({ 
      error: 'URI_MISSING', 
      message: 'MONGO_URI environment variable is missing in Vercel settings.' 
    });
  }

  try {
    // Basic string check to prevent DNS_HOSTNAME_EMPTY if it's just "yaswanth"
    if (!uri.startsWith('mongodb')) {
      return res.status(500).json({ 
        error: 'INVALID_URI', 
        message: 'The MONGO_URI does not start with "mongodb". Make sure you pasted the full link, not just your password.',
        foundValue: uri.substring(0, 5) + '...'
      });
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    
    return res.status(200).json({
      status: 'Connected',
      dbName: mongoose.connection.name,
      readyState: mongoose.connection.readyState
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      error: error.message,
      hint: 'Check your password and MongoDB Network Access (0.0.0.0/0)'
    });
  }
};
