const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
exports.register = async (req, res) => {
    console.log(req.body)
    const { Email, Password } = req.body;
    console.log("Register")
    try {
        console.log("Inside try")
        // Check if the user already exists
        let user = await User.findOne({ Email });
        if (user) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        let username=Email;
        // Create new user
        user = new User({ username, Email, Password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(Password, salt);

        await user.save();

        // Generate JWT token
        const token = generateToken(user);
        console.log("token Sent frontned register :", token)
        console.log(token)
        // res.cookie('token', token, { httpOnly: true });
        res.cookie('token', token, { httpOnly: true, secure: true });
        console.log("Sent the token and will send response")
        
        res.status(201).json({ success: true, message: 'User registered', token });
    } catch (err) {
        console.error(err.message);
        console.log("Authcotroller")
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { Email, Password} = req.body;
    console.log(Email, Password);
    console.log("Login")
    try {
        // Check if the user exists
        let user = await User.findOne({ Email });
        if (!user) {
            console.log("user not found")
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);
        console.log("token Sent frontned login :", token)
        // res.cookie('token', token, { httpOnly: true });
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.json({ success: true, message: 'User logged in', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'User logged out' });
};
