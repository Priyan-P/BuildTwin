const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect, authorize } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockContactMessages } = require('../utils/mockStore');

// @route   POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const newContact = {
        _id: 'contact_' + Date.now(),
        name,
        email,
        phone: phone || '',
        subject,
        message,
        createdAt: new Date()
      };
      mockContactMessages.unshift(newContact);
      return res.status(201).json({ success: true, message: 'Your message has been sent successfully. Our BuildTwin team will get back to you shortly!' });
    }

    await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Your message has been sent successfully. Our BuildTwin team will get back to you shortly!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/contact (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const dbState = getDbState();
    if (dbState.useMockStore) {
      return res.json({ success: true, count: mockContactMessages.length, messages: mockContactMessages });
    }
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
