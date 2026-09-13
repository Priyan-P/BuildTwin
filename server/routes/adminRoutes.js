const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Booking = require('../models/Booking');
const { protect, authorize } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockUsers, mockProjects, mockBookings } = require('../utils/mockStore');
const bcrypt = require('bcryptjs');

// @route   GET /api/admin/stats
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const dbState = getDbState();

    if (dbState.useMockStore) {
      const totalClients = mockUsers.filter(u => u.role === 'client').length;
      const totalDesigners = mockUsers.filter(u => u.role === 'designer').length;
      const pendingDesigners = mockUsers.filter(u => u.role === 'designer' && u.status === 'pending').length;
      const totalProjects = mockProjects.length;
      const activeProjects = mockProjects.filter(p => p.status !== 'Completed').length;
      const completedProjects = mockProjects.filter(p => p.status === 'Completed').length;
      const pendingRequests = mockProjects.filter(p => p.status === 'Submitted' || p.status === 'Under Review').length;

      const statusCounts = {};
      mockProjects.forEach(p => {
        statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
      });
      const projectsByStatus = Object.keys(statusCounts).map(status => ({
        status,
        count: statusCounts[status]
      }));

      const typeCounts = {};
      mockProjects.forEach(p => {
        typeCounts[p.buildingType] = (typeCounts[p.buildingType] || 0) + 1;
      });
      const projectsByBuildingType = Object.keys(typeCounts).map(type => ({
        type,
        count: typeCounts[type]
      }));

      const monthlyRequests = [
        { month: 'Jan', requests: 4, completed: 2 },
        { month: 'Feb', requests: 7, completed: 5 },
        { month: 'Mar', requests: 9, completed: 6 },
        { month: 'Apr', requests: 12, completed: 8 },
        { month: 'May', requests: 15, completed: 11 },
        { month: 'Jun', requests: 18, completed: 14 }
      ];

      return res.json({
        success: true,
        stats: {
          totalClients,
          totalDesigners,
          pendingDesigners,
          totalProjects,
          activeProjects,
          completedProjects,
          pendingRequests
        },
        charts: {
          projectsByStatus,
          projectsByBuildingType,
          monthlyRequests
        }
      });
    }

    const totalClients = await User.countDocuments({ role: 'client' });
    const totalDesigners = await User.countDocuments({ role: 'designer' });
    const pendingDesigners = await User.countDocuments({ role: 'designer', status: 'pending' });
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $ne: 'Completed' } });
    const completedProjects = await Project.countDocuments({ status: 'Completed' });
    const pendingRequests = await Project.countDocuments({ status: { $in: ['Submitted', 'Under Review'] } });

    const statusAgg = await Project.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const projectsByStatus = statusAgg.map(item => ({ status: item._id, count: item.count }));

    const typeAgg = await Project.aggregate([
      { $group: { _id: '$buildingType', count: { $sum: 1 } } }
    ]);
    const projectsByBuildingType = typeAgg.map(item => ({ type: item._id, count: item.count }));

    const monthlyRequests = [
      { month: 'Jan', requests: 4, completed: 2 },
      { month: 'Feb', requests: 7, completed: 5 },
      { month: 'Mar', requests: 9, completed: 6 },
      { month: 'Apr', requests: 12, completed: 8 },
      { month: 'May', requests: 15, completed: 11 },
      { month: 'Jun', requests: 18, completed: 14 }
    ];

    res.json({
      success: true,
      stats: {
        totalClients,
        totalDesigners,
        pendingDesigners,
        totalProjects,
        activeProjects,
        completedProjects,
        pendingRequests
      },
      charts: {
        projectsByStatus,
        projectsByBuildingType,
        monthlyRequests
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/admin/users
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const dbState = getDbState();
    if (dbState.useMockStore) {
      const sanitized = mockUsers.map(u => ({
        id: u._id,
        _id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        status: u.status || 'active',
        specialization: u.specialization || '',
        experience: u.experience || '',
        createdAt: u.createdAt
      }));
      return res.json({ success: true, count: sanitized.length, users: sanitized });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/admin/designers/:id/approve
router.put('/designers/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const dbState = getDbState();
    const id = req.params.id;

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u._id.toString() === id || u.id === id);
      if (!user) return res.status(404).json({ success: false, message: 'Designer user not found' });
      user.status = 'active';
      return res.json({ success: true, user, message: `Designer ${user.name} approved successfully!` });
    }

    const user = await User.findByIdAndUpdate(id, { status: 'active' }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'Designer user not found' });

    res.json({ success: true, user, message: `Designer ${user.name} approved successfully!` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/admin/users/:id/status
router.put('/users/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const dbState = getDbState();
    const id = req.params.id;

    if (!['active', 'pending', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u._id.toString() === id || u.id === id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      user.status = status;
      return res.json({ success: true, user, message: `User status updated to ${status}` });
    }

    const user = await User.findByIdAndUpdate(id, { status }, { new: true }).select('-password');
    res.json({ success: true, user, message: `User status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/admin/create-designer
router.post('/create-designer', protect, authorize('admin'), async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const salt = bcrypt.genSaltSync(10);
      const newDesigner = {
        _id: 'designer_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, salt),
        phone: phone || '',
        role: 'designer',
        status: 'active',
        specialization: specialization || 'Architectural 3D Modeling',
        experience: experience || '',
        createdAt: new Date()
      };
      mockUsers.push(newDesigner);
      return res.status(201).json({ success: true, user: newDesigner, message: 'Designer account created successfully' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const designer = await User.create({
      name,
      email,
      password,
      phone,
      role: 'designer',
      status: 'active',
      specialization,
      experience
    });

    res.status(201).json({ success: true, user: designer, message: 'Designer account created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
