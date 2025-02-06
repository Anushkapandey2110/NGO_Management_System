const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validationMiddleware');
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { createEvent, approveEvent, getEvents, registerForEvent, unregisterFromEvent, getRegisteredEvents, markComplete,getEvent } = require('../controllers/eventController')
//console.log("In authRoutes")
router.post('/createEvent', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin'), createEvent);
router.get('/getEvents', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin', 'User'), getEvents);
router.put('/approve/:eventid', authMiddleware, authorizeRoles('SuperAdmin'), approveEvent); //use params to extract
router.post('/registerForEvent', authMiddleware, authorizeRoles('User', 'Employee', 'Admin', 'SuperAdmin'), registerForEvent);
router.get('/getRegisteredEvents', authMiddleware, authorizeRoles('User', 'Employee', 'Admin', 'SuperAdmin'), getRegisteredEvents);
router.post('/markComplete', authMiddleware, authorizeRoles('Employee', 'Admin', 'SuperAdmin'), markComplete);
router.post('/unregisterFromEvent', authMiddleware, authorizeRoles('User', 'SuperAdmin', 'Admin', 'Employee'), unregisterFromEvent)
// router.get('/getEventAttendee/:eventId',authMiddleware, getEvent);
router.get('/getEventAttendee/:eventId', authMiddleware, getEvent);

module.exports = router;
