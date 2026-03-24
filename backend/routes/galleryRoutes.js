const express = require('express');
const multer = require('multer');
const path = require('path');
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all images (public)
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST upload image (admin only)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await Gallery.create({ title, imageUrl, category, description });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE image (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
