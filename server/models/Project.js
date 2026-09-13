const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true }, // e.g. BT-2026-0001
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  projectName: { type: String, required: true },
  buildingType: { 
    type: String, 
    enum: ['Individual House', 'Villa', 'Apartment', 'Commercial Building', 'Office', 'Other'],
    default: 'Individual House'
  },
  floors: { type: Number, default: 1 },
  area: { type: Number, default: 1000 }, // sq ft
  location: { type: String, default: '' },
  constructionStage: { type: String, default: 'Planning & Blueprint' },
  services: [{ type: String }],
  description: { type: String, default: '' },
  blueprintFile: {
    filename: { type: String, default: '' },
    originalName: { type: String, default: '' },
    path: { type: String, default: '' },
    fileType: { type: String, default: '' },
    size: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: [
      'Submitted',
      'Under Review',
      'Approved',
      '3D Modeling',
      'Utility Mapping',
      'VR Development',
      'Client Review',
      'Revision',
      'Completed'
    ],
    default: 'Submitted'
  },
  currentVersion: { type: String, default: 'v1.0' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
