const { verifyToken } = require('../utils/jwtUtils');
const User = require('../models/userModel')


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'AAccess Denied. Insufficient Permissions.' });
    }
    console.log("going next next ")
    next();
  };
};