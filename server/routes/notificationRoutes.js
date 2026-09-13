const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockNotifications } = require('../utils/mockStore');

// @route   GET /api/notifications
router.get('/', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const userId = (req.user._id || req.user.id).toString();

    if (dbState.useMockStore) {
      const userNotifs = mockNotifications.filter(n => n.userId.toString() === userId);
      return res.json({ success: true, count: userNotifs.length, notifications: userNotifs });
    }

    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/notifications/:id/read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const notif = mockNotifications.find(n => n._id.toString() === id);
      if (notif) notif.isRead = true;
      return res.json({ success: true, message: 'Notification marked as read' });
    }

    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
