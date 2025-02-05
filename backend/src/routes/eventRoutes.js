const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validationMiddleware');
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { createEvent, approveEvent, getEvent, registerForEvent, unregisterFromEvent, getRegisteredEvents, markComplete } = require('../controllers/eventController')
//console.log("In authRoutes")
router.post('/createEvent', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin'), createEvent);
router.get('/getEvent', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin', 'User'), getEvent);
router.put('/approve/:eventid', authMiddleware, authorizeRoles('SuperAdmin'), approveEvent); //use params to extract
router.post('/registerForEvent', authMiddleware, authorizeRoles('User', 'Employee', 'Admin', 'SuperAdmin'), registerForEvent);
router.get('/getRegisteredEvents', authMiddleware, authorizeRoles('User', 'Employee', 'Admin', 'SuperAdmin'), getRegisteredEvents);
router.post('/markComplete', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin'), markComplete);
router.post('/unregisterFromEvent', authMiddleware, authorizeRoles('User', 'SuperAdmin', 'Admin', 'Employee'), unregisterFromEvent)
module.exports = router;
