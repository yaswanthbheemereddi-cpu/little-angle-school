const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id), name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/auth/register (initial admin setup)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      return res.status(403).json({ message: 'Admin already exists. Contact super admin.' });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id), name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
