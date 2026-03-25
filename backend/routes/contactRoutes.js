const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/authMiddleware');
const { sendContactNotificationToSchool } = require('../utils/emailService');

// @desc  Submit contact form (public)
// @route POST /api/contact
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  const contact = await Contact.create({ name, email, phone, subject, message });
  // Notify school (fire-and-forget)
  sendContactNotificationToSchool(contact).catch(err => console.error('Contact email failed:', err.message));
  res.status(201).json({ message: 'Message received! We will get back to you soon.', contact });
}));

// @desc  Get all contact messages (admin)
// @route GET /api/contact
router.get('/', protect, asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
}));

// @desc  Update status (admin)
// @route PUT /api/contact/:id
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const msg = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(msg);
}));

// @desc  Delete a message (admin)
// @route DELETE /api/contact/:id
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
}));

module.exports = router;
