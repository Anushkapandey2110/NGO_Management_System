const Event = require('../models/eventModel');
const User = require('../models/userModel');


exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, moderators } = req.body;

        // Ensure only admins or moderators can create events
        if (req.user.role !== 'admin' && req.user.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        // Validate moderators' roles
        const validModerators = await User.find({
            _id: { $in: moderators },
            role: 'moderator'
        });

        if (validModerators.length !== moderators.length) {
            return res.status(400).json({ message: 'Invalid moderators provided.' });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy: req.user.id,
            moderators,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully.', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};