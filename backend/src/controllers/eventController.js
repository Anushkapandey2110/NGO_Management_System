const Event = require('../models/eventModel');
const User = require('../models/userModel');


exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, moderators } = req.body;
        let status='pending';
        // Ensure only admins or moderators can create events
        if (req.user.role !== 'Employee' && req.user.role !== 'Admin' && req.user.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        if (req.user.role == 'SuperAdmin') {
           status='approved';
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
            status,
            createdBy: req.user.id,
            moderators,
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully.', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


exports.approveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        if (req.user.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }
        const event = await Event.findByIdAndUpdate(
            eventId,
            { status: 'approved' },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        res.status(200).json({ message: 'Event approved.', event });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};