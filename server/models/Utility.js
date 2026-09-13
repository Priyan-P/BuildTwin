const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
  utilityId: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  type: {
    type: String,
    enum: ['electrical', 'water', 'gas', 'cable', 'appliance'],
    required: true
  },
  name: { type: String, required: true },
  room: { type: String, required: true },
  route: { type: String, required: true },
  connectionPoint: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Planned', 'Maintenance', 'Inactive'], default: 'Active' },
  coordinates: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    z: { type: Number, default: 0 }
  },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model('Utility', utilitySchema);
