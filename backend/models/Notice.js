const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General' },
  isImportant: { type: Boolean, default: false },
  attachmentUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
