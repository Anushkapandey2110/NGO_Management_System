const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validationMiddleware');
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { createEvent, approveEvent }= require('../controllers/eventController')
//console.log("In authRoutes")
router.post('/create', authMiddleware, authorizeRoles('Employee','Admin', 'SuperAdmin'), createEvent );
router.put('/approve/:eventId', authMiddleware, authorizeRoles('SuperAdmin') , approveEvent);
router.post('/logout', logout);

module.exports = router;
