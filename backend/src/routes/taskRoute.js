const express = require('express');
const router = express.Router();
const { authorizeRoles } = require('../middlewares/roleAuthMiddleware')
const profileController = require('../controllers/profileController');
const { authMiddleware } = require('../middlewares/authMiddleware')
const { assignTask } = require('../controllers/taskController')

router.post('/assignTask',authMiddleware, authorizeRoles('Employee','Admin','SuperAdmin'), assignTask);

module.exports = router;