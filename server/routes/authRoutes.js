const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { getDbState } = require('../config/db');
const { mockUsers } = require('../utils/mockStore');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'buildtwin_super_secret_jwt_key_2026_vr_utility_twin', {
    expiresIn: '30d'
  });
};

// ==========================================
// 1. CLIENT REGISTRATION
// ==========================================
// @route   POST /api/auth/client/register
router.post('/client/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists with this email address' });
      }
      const salt = bcrypt.genSaltSync(10);
      const newUser = {
        _id: 'client_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, salt),
        phone: phone || '',
        role: 'client', // Backend forced!
        status: 'active',
        createdAt: new Date()
      };
      mockUsers.push(newUser);
      const token = generateToken(newUser._id, newUser.role);
      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: 'client', status: 'active', phone: newUser.phone },
        message: 'Client account registered successfully!'
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email address' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'client', // Backend forced!
      status: 'active'
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'client', status: 'active', phone: user.phone },
      message: 'Client account registered successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. DESIGNER REGISTRATION (Creates Pending Account)
// ==========================================
// @route   POST /api/auth/designer/register
router.post('/designer/register', async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience, skills } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : (skills || []);
    const dbState = getDbState();

    if (dbState.useMockStore) {
      const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'Designer account already exists with this email' });
      }
      const salt = bcrypt.genSaltSync(10);
      const newUser = {
        _id: 'designer_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, salt),
        phone: phone || '',
        role: 'designer', // Backend forced!
        status: 'pending', // Requires Admin Approval
        specialization: specialization || 'Architectural 3D Modeling',
        experience: experience || '',
        skills: parsedSkills,
        createdAt: new Date()
      };
      mockUsers.push(newUser);
      return res.status(201).json({
        success: true,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: 'designer', status: 'pending' },
        message: 'Designer application submitted! Your account is pending Admin approval.'
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Designer account already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'designer', // Backend forced!
      status: 'pending', // Requires Admin Approval
      specialization: specialization || 'Architectural 3D Modeling',
      experience: experience || '',
      skills: parsedSkills
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: 'designer', status: 'pending' },
      message: 'Designer application submitted! Your account is pending Admin approval.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3. CLIENT LOGIN
// ==========================================
// @route   POST /api/auth/client/login
router.post('/client/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      if (user.role !== 'client') {
        return res.status(403).json({
          success: false,
          message: `These credentials are registered as '${user.role.toUpperCase()}'. Please use the correct login portal.`
        });
      }
      const token = generateToken(user._id, user.role);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: 'client', status: user.status }
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.role !== 'client') {
      return res.status(403).json({
        success: false,
        message: `These credentials are registered as '${user.role.toUpperCase()}'. Please use the correct login portal.`
      });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'client', status: user.status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 4. DESIGNER LOGIN
// ==========================================
// @route   POST /api/auth/designer/login
router.post('/designer/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      if (user.role !== 'designer') {
        return res.status(403).json({
          success: false,
          message: `These credentials are not registered for Designer access (Current role: ${user.role.toUpperCase()}). Please use the correct login.`
        });
      }
      if (user.status === 'pending') {
        return res.status(403).json({
          success: false,
          message: 'Your Designer account is pending Admin approval. Please contact system administrator.'
        });
      }
      if (user.status === 'suspended') {
        return res.status(403).json({ success: false, message: 'Your Designer account has been suspended by Admin.' });
      }
      const token = generateToken(user._id, user.role);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: 'designer', status: user.status }
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.role !== 'designer') {
      return res.status(403).json({
        success: false,
        message: `These credentials are not registered for Designer access (Current role: ${user.role.toUpperCase()}). Please use the correct login.`
      });
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Your Designer account is pending Admin approval. Please contact system administrator.'
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your Designer account has been suspended by Admin.' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'designer', status: user.status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. ADMIN LOGIN
// ==========================================
// @route   POST /api/auth/admin/login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const dbState = getDbState();

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }
      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access Restricted. These credentials do not have System Administrator privileges.'
        });
      }
      const token = generateToken(user._id, user.role);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: 'admin', status: user.status }
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access Restricted. These credentials do not have System Administrator privileges.'
      });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'admin', status: user.status }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generic Login (backward compatibility fallback)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbState = getDbState();

    if (dbState.useMockStore) {
      const user = mockUsers.find(u => u.email.toLowerCase() === email?.toLowerCase());
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user._id, user.role);
        return res.json({
          success: true,
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status }
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email: email?.toLowerCase() });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, user.role);
      return res.json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status }
      });
    }
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id || req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status || 'active',
        phone: req.user.phone,
        avatar: req.user.avatar || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
