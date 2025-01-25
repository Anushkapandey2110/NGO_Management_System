const Event = require('../models/eventModel');
const User = require('../models/userModel');


exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, moderators } = req.body;
        let status = 'pending';
        // Ensure only admins or moderators can create events
        if (req.user.role !== 'Employee' && req.user.role !== 'Admin' && req.user.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }

        if (req.user.role == 'SuperAdmin') {
            status = 'approved';
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

// exports.getEvent = async (req, res) => {
//     try {
//         const role = req.user.role;
//         // let statusFilter = {};
//         let status;
//         console.log("rolee  ",role)
//         // Determine the status filter based on the user's role
//         if (role === 'User') {
//             // statusFilter.status 
//             status= 'Approved'; // Volunteers see only approved events
//         } else if (role === 'Admin') {
//             // statusFilter.status
//             status = 'Pending'; // Admins see only pending events
//         } else if (role === 'Employee') {
//             // statusFilter.status = { $in: ['Approved', 'Pending'] }; // Employees see both approved and pending events
//             status='Pending';
//         } else {
//             return res.status(403).json({ message: 'Access denied.' });
//         }

//         // Query for events based on status and future or current date
//         const events = await Event.find({
//             // ...statusFilter,
//             status:status
//             // date: { $gte: new Date() }, // Ensure only future or current events are retrieved
//         });

//         if (!events || events.length === 0) {
//             return res.status(404).json({ message: 'No events found.' });
//         }

//         res.status(200).json({ message: 'Events retrieved successfully.', events });
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         res.status(500).json({ message: 'Server error.', error });
//     }
// };
exports.getEvent = async (req, res) => {
    try {
        const role = req.user.role;
        let status;

        console.log('Role:', role);

        // Determine the status based on the user's role
        if (role === 'User') {
            status = 'approved';
        } else if (role === 'Admin') {
            status = 'pending';
        } else if (role === 'Employee') {
            status = { $in: ['approved', 'pending'] }; // Employees see both
        } else {
            return res.status(403).json({ message: 'Access denied.' });
        }

        console.log('Status filter:', status);

        // Query the events
        const events = await Event.find({
            status,
            date: { $gte: new Date() }, // Optional: Ensure only future or current events
        });

        if (!events || events.length === 0) {
            console.log('No events found for the query.');
            return res.status(404).json({ message: 'No events found.' });
        }

        res.status(200).json({ message: 'Events retrieved successfully.', events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
};


exports.registerForEvent=async (req,res)=>{
    try {
        // Extract userId from req.user (set by authentication middleware)
        const userId = req.user.id; // Assuming req.user is populated after authentication
        if (!userId) {
          return res.status(401).json({ success: false, message: 'Unauthorized: No user ID provided' });
        }
    
        // Extract eventId from the request body
        const { eventId } = req.body;
        if (!eventId) {
          return res.status(400).json({ success: false, message: 'Bad Request: Event ID is required' });
        }
    
        // Find the event
        const event = await Event.findById(eventId);
        console.log("event : ", event);
        if (!event) {
          return res.status(404).json({ success: false, message: 'Event not found' });
        }
    
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        // Check if the user is already registered for the event
        if (user.registeredEvents.includes(eventId)) {
          return res.status(400).json({ success: false, message: 'You are already registered for this event' });
        }
    
        // Register the user for the event
        user.registeredEvents.push(eventId);
        await user.save();
    
        // Add the user to the event's participants
        event.participants.push({ user: userId, role: 'attendee' });
        let eve= await event.save();
        console.log("event : ", eve)
    
        return res.status(200).json({ success: true, message: 'Successfully registered for the event' });
    } catch (error) {
        console.error('Error registering for event:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}


exports.getRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user.id; // Assume `req.user` contains the authenticated user's details

    // Fetch the user with populated registered events
    const user = await User.findById(userId).populate({
      path: 'registeredEvents',
      select: 'title description date location status', // Only select relevant fields from Event
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ registeredEvents: user.registeredEvents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching registered events', error });
  }
};


