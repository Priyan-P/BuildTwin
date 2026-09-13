const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockBookings } = require('../utils/mockStore');

// @route   GET /api/bookings
router.get('/', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const role = req.user.role;
    const userId = (req.user._id || req.user.id).toString();

    if (dbState.useMockStore) {
      let filtered = [...mockBookings];
      if (role === 'client') {
        filtered = mockBookings.filter(b => b.clientId.toString() === userId);
      }
      return res.json({ success: true, count: filtered.length, bookings: filtered });
    }

    let query = {};
    if (role === 'client') {
      query.clientId = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate('clientId', 'name email phone')
      .populate('projectId', 'projectName projectId')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const { projectId, date, time, meetingType, notes, projectName } = req.body;

    if (!date || !time) {
      return res.status(400).json({ success: false, message: 'Consultation date and time are required' });
    }

    const dbState = getDbState();
    const userId = req.user._id || req.user.id;
    const bookingId = `BK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    if (dbState.useMockStore) {
      const newBooking = {
        _id: 'bk_' + Date.now(),
        bookingId,
        clientId: userId,
        projectId: projectId || null,
        clientName: req.user.name,
        clientEmail: req.user.email,
        projectName: projectName || 'General Consultation',
        date,
        time,
        meetingType: meetingType || 'Video Call',
        notes: notes || '',
        status: 'Pending',
        createdAt: new Date()
      };
      mockBookings.unshift(newBooking);
      return res.status(201).json({ success: true, booking: newBooking, message: 'Consultation booked successfully!' });
    }

    const booking = await Booking.create({
      bookingId,
      clientId: userId,
      projectId: projectId || null,
      clientName: req.user.name,
      clientEmail: req.user.email,
      projectName: projectName || 'General Consultation',
      date,
      time,
      meetingType: meetingType || 'Video Call',
      notes,
      status: 'Pending'
    });

    res.status(201).json({ success: true, booking, message: 'Consultation booked successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/bookings/:id/status
router.put('/:id/status', protect, authorize('designer', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const bk = mockBookings.find(b => b._id.toString() === id || b.bookingId === id);
      if (!bk) return res.status(404).json({ success: false, message: 'Booking not found' });
      bk.status = status;
      return res.json({ success: true, booking: bk, message: `Booking status updated to ${status}` });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    res.json({ success: true, booking, message: `Booking status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
