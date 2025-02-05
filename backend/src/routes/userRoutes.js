// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { Search } = require('../controllers/userController');

// router.get('/profile', authMiddleware, getUserProfile);
router.get('/Search', Search);
module.exports = router;
