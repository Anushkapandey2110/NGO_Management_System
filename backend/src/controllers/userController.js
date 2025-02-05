// controllers/userController.js

const User = require('../models/userModel');

// const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.status(200).json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// router.get("/search", async (req, res) => {
const Search = async (req, res) => {
    try {
        const query = req.query.query || "";
        console.log("QUery ", query)
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Case-insensitive regex search for username
        const users = await User.find({
            username: { $regex: query, $options: "i" }
        }).limit(10); // Limit results
        console.log("userrr :", users)
        res.json({ users });
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    // getUserProfile,
    Search
};
