const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDbState } = require('../config/db');
const { mockUsers } = require('../utils/mockStore');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'buildtwin_super_secret_jwt_key_2026_vr_utility_twin');

      const dbState = getDbState();
      if (dbState.useMockStore) {
        const found = mockUsers.find(u => u._id.toString() === decoded.id || u.id === decoded.id);
        if (found) {
          req.user = found;
          return next();
        }
      } else {
        req.user = await User.findById(decoded.id).select('-password');
        if (req.user) return next();
      }
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user ? req.user.role : 'none'}' is not authorized for this resource.`
      });
    }
    next();
  };
};

const requireClient = authorize('client');
const requireDesigner = authorize('designer');
const requireAdmin = authorize('admin');

module.exports = {
  protect,
  authorize,
  requireClient,
  requireDesigner,
  requireAdmin
};
