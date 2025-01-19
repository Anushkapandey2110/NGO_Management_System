const { verifyToken } = require('../utils/jwtUtils');
const User = require('../models/userModel')
const authMiddleware = async (req, res, next) => {
    var token = req.cookies.token;
    //fix this not gettting token from cookies
    // console.log("In auth middle");
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        // console.log("sending auth header missing")
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    token = authHeader.split(' ')[1]; // Bearer <token>
    
//   console.log('Received Token:', token); // Log the token to verify
    
    // console.log(token)
    if (!token) {
        // console.log("sending No token")
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        // const currentTime = Math.floor(Date.now() / 1000);
        
        // console.log('Current Time:', currentTime);
        // console.log('Token Expiration Time:', decoded.exp);
        // console.log('Decoded Payload:', decoded);
        

        // if (currentTime > decoded.exp) {
        //      console.error('Token has expired');
        // } else {
        //     console.log('Token is valid');
        // }
        const decoded = verifyToken(token);
        const user = await User.findOne({ user_id: decoded.id });
        // console.log("User", user);
        req.user = user;
        next();
    } catch (err) {
        console.log("Sending token is invalid")
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
