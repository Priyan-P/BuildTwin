const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockMessages, mockProjects } = require('../utils/mockStore');

// @route   GET /api/projects/:id/messages
router.get('/:id/messages', protect, async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const msgs = mockMessages.filter(m => m.projectId.toString() === projId || m.projectId === id);
      return res.json({ success: true, count: msgs.length, messages: msgs });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });

    const targetId = project ? project._id : id;
    const messages = await Message.find({ projectId: targetId }).sort({ createdAt: 1 });
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/projects/:id/messages
router.post('/:id/messages', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty' });
    }

    if (dbState.useMockStore) {
      const proj = mockProjects.find(p => p._id.toString() === id || p.projectId === id);
      const projId = proj ? proj._id.toString() : id;
      const newMsg = {
        _id: 'msg_' + Date.now(),
        messageId: `MSG-${Date.now().toString().slice(-4)}`,
        projectId: projId,
        senderId: req.user._id || req.user.id,
        senderName: req.user.name,
        senderRole: req.user.role,
        message: message.trim(),
        attachments: [],
        createdAt: new Date()
      };
      mockMessages.push(newMsg);
      return res.status(201).json({ success: true, message: newMsg });
    }

    let project = await Project.findById(id);
    if (!project) project = await Project.findOne({ projectId: id });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const msgObj = await Message.create({
      messageId: `MSG-${Date.now().toString().slice(-4)}`,
      projectId: project._id,
      senderId: req.user._id,
      senderName: req.user.name,
      senderRole: req.user.role,
      message: message.trim()
    });

    res.status(201).json({ success: true, message: msgObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
