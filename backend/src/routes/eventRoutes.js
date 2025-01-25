const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validationMiddleware');
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { createEvent, approveEvent, getEvent, registerForEvent, getRegisteredEvents }= require('../controllers/eventController')
//console.log("In authRoutes")
router.post('/create', authMiddleware, authorizeRoles('Employee','Admin', 'SuperAdmin'), createEvent );
router.get('/getEvent', authMiddleware, authorizeRoles('Employee','Admin', 'SuperAdmin','User'), getEvent );
router.put('/approve/:eventId', authMiddleware, authorizeRoles('SuperAdmin') , approveEvent);
router.post('/registerForEvent',authMiddleware, authorizeRoles('User','Employee','Admin', 'SuperAdmin'),registerForEvent);
router.get('/getRegisteredEvents',authMiddleware, authorizeRoles('User','Employee','Admin', 'SuperAdmin'),getRegisteredEvents);


module.exports = router;
