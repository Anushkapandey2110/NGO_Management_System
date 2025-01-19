const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../middlewares/validationMiddleware');
console.log("In authRoutes")
router.post('/register', validateRegister, register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
