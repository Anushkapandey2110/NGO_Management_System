const express = require('express');
const router = express.Router();
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const profileController = require('../controllers/profileController');
const {authMiddleware} = require('../middlewares/authMiddleware')
router.get('/profile', authMiddleware,authorizeRoles('user', 'employee', 'Admin', 'SuperAdmin'), profileController.getProfile);
router.put('/profile', authMiddleware,authorizeRoles('user', 'employee', 'Admin', 'SuperAdmin'), profileController.updateProfile);
router.post('/change-password', authMiddleware,authorizeRoles('user', 'employee', 'Admin', 'SuperAdmin'), profileController.changePassword);

module.exports = router;
