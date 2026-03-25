const express = require('express');
const Admission = require('../models/Admission');
const { protect } = require('../middleware/authMiddleware');
const { sendAdmissionNotificationToSchool, sendAdmissionConfirmationToParent } = require('../utils/emailService');
const router = express.Router();

// GET all admissions (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST submit admission (public)
router.post('/', async (req, res) => {
  try {
    const admission = await Admission.create(req.body);

    // Send emails (fire-and-forget — don't fail the response if email fails)
    Promise.all([
      sendAdmissionNotificationToSchool(admission).catch(err =>
        console.error('School notification email failed:', err.message)
      ),
      sendAdmissionConfirmationToParent(admission).catch(err =>
        console.error('Parent confirmation email failed:', err.message)
      ),
    ]);

    res.status(201).json({ message: 'Admission submitted successfully via Email!', id: admission._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update status (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an admission (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admission record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
