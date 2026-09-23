const mongoose = require('mongoose');

const projectVersionSchema = new mongoose.Schema({
  versionId: { type: String, required: true },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  versionNumber: { type: String, required: true },
  changes: { type: String, required: true },

  files: [{
    name: { type: String },
    url: { type: String },
    type: { type: String }
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdByName: {
    type: String,
    default: 'Designer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('ProjectVersion', projectVersionSchema);