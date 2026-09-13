const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
  clientName: { type: String },
  clientEmail: { type: String },
  projectName: { type: String, default: 'General Consultation' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  meetingType: { type: String, enum: ['Video Call', 'Phone Call', 'In Person'], default: 'Video Call' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
