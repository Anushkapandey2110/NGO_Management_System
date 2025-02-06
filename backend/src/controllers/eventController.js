const Event = require('../models/eventModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.createEvent = async (req, res) => {
    try {
        console.log("Event creation request received");

        const { title, description, date, location, moderators } = req.body;
        let status = 'pending';

        // Ensure only Employees, Admins, and SuperAdmins can create events
        if (!['Employee', 'Admin', 'SuperAdmin'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        if (req.user.role === 'SuperAdmin') {
            status = 'approved';
        }

        // Validate moderators' roles
        const validModerators = await User.find({
            _id: { $in: moderators },
            role: { $in: ['SuperAdmin', 'Admin', 'Employee'] } // Ensure only valid roles are selected
        });

        if (validModerators.length !== moderators.length) {
            return res.status(400).json({ message: 'Invalid moderators provided.' });
        }

        // Convert valid moderators to participant format
        const participants = validModerators.map(moderator => ({
            user: moderator._id,
            role: 'moderator'
        }));

        // Add event creator as a moderator
        // participants.push({
        //     user: req.user.id,
        //     role: 'moderator' // Creator is a moderator
        // });

        // Create the event
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            status,
            createdBy: req.user.id,
            participants, // Store moderators (including the creator)
        });

        // Save the event
        await newEvent.save();

        // Register the event for the creator and moderators (similar to the registration process)
        const userIds = [req.user.id, ...validModerators.map(moderator => moderator._id)];

        // Register each moderator and the creator for the event
        for (const userId of userIds) {
            const user = await User.findById(userId);
            if (user) {
                // Add the event to the user's registeredEvents array
                if (!user.registeredEvents.includes(newEvent._id)) {
                    user.registeredEvents.push(newEvent._id);
                    await user.save();
                }

                // Add the user to the event's participants with role 'moderator'
                if (!newEvent.participants.some(participant => participant.user.toString() === userId.toString())) {
                    newEvent.participants.push({ user: userId, role: 'moderator' });
                    await newEvent.save();
                }
            }
        }

        // Return a success response
        res.status(201).json({ message: 'Event created and moderators registered successfully.', event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: 'Server error.', error });
    }
};



exports.approveEvent = async (req, res) => {
    try {
        // console.log("Req : ",req);
        const { eventid } = req.params;
        // console.log("Event ID", eventid);

        if (req.user.role !== 'SuperAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }
        const event = await Event.findByIdAndUpdate(
            eventid,
            { status: 'approved' },
            { new: true }
        );
        // console.log("event : ", event);

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
exports.getEvents = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user._id;
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

        // console.log('Status filter:', status);

        // Query the events
        // const events = await Event.find({
        //     status,
        //     date: { $gte: new Date() }, // Optional: Ensure only future or current events
        // });


        // Query events: filter by status, exclude registered events, and only include future events
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const registeredEventIds = user.registeredEvents || [];

        // Query events: filter by status, exclude registered events, and only include future events
        const events = await Event.find({
            status: status,
            date: { $gte: new Date() }, // Show only future events
            _id: { $nin: registeredEventIds } // Exclude registered events
        }).populate('createdBy', 'username Email') // Populate creator details
            .populate('participants.user', 'username role'); // Populate participants' details


        if (!events || events.length === 0) {
            // console.log('No events found for the query.');
            return res.status(404).json({ message: 'No events found.' });
        }

        res.status(200).json({ message: 'Events retrieved successfully.', events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error.', error });
    }
};

exports.registerForEvent = async (req, res) => {
    try {
        // Extract userId from req.user (set by authentication middleware)
        const userId = req.user.id; // Assuming req.user is populated after authentication
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No user ID provided' });
        }
        console.log(userId);
        // Extract eventId from the request body
        const { eventId } = req.body;
        console.log("Event id : ", req.body);
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
        let eve = await event.save();
        console.log("event : ", eve)

        return res.status(200).json({ success: true, message: 'Successfully registered for the event' });
    } catch (error) {
        console.error('Error registering for event:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}


exports.unregisterFromEvent = async (req, res) => {
    try {
        // Extract userId from req.user (set by authentication middleware)
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No user ID provided' });
        }

        // Extract eventId from request body
        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ success: false, message: 'Bad Request: Event ID is required' });
        }

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user is actually registered for the event
        if (!user.registeredEvents.includes(eventId)) {
            return res.status(400).json({ success: false, message: 'You are not registered for this event' });
        }

        // Remove event from user's registered events
        user.registeredEvents = user.registeredEvents.filter(event => event.toString() !== eventId);
        await user.save();

        // Remove user from event's participants
        event.participants = event.participants.filter(participant => participant.user.toString() !== userId);
        await event.save();

        return res.status(200).json({ success: true, message: 'Successfully unregistered from the event' });
    } catch (error) {
        console.error('Error unregistering from event:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
};



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


exports.markComplete = async (req, res) => {
    try {
        console.log("here in markComplete");
        const { eventId } = req.body;
        console.log("EventId : ", eventId);
        // Fetch the event from the database
        const event = await Event.findById(eventId);
        console.log("event to complete : ", event)

        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Check permissions based on role
        if (req.user.role === 'Employee') {
            // Employees can only mark events they created
            if (event.createdBy.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Access denied: You can only mark events you created as completed.' });
            }
        } else if (!['Admin', 'SuperAdmin'].includes(req.user.role)) {
            // Only Admins, SuperAdmins, and eligible Employees are allowed
            return res.status(403).json({ message: 'Access denied: Insufficient permissions.' });
        }

        // Mark the event as completed
        event.status = 'completed';
        await event.save();
        const event2 = await Event.findById(eventId);
        console.log("event marked : ", event2)
        res.status(200).json({ message: 'Event marked as completed successfully.', event });
    } catch (error) {
        console.error('Error marking event as completed:', error);
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
};

// exports.getEvent=async(req,res)=>{
//     try {
//         const { eventId } = req.params; // Extract eventId from URL
//         const { query } = req.query;   // Extract search query
//         console.log("event id get event :", eventId)
//         if (!mongoose.Types.ObjectId.isValid(eventId)) {
//             return res.status(400).json({ message: "Invalid event ID format" });
//           }
//           console.log("eve id: " ,eventId)
//         // Fetch event details along with participants (if stored in event schema)
//         // const event = await Event.findById(eventId)
//         // .select("title description date location participants") // Select necessary fields
//         // .populate({
//         //   path: "participants.user", // Populate the 'user' field inside participants
//         //   select: "username email profilePicture", // Select user details
//         // });
//         const event = await Event.findById(eventId)
//   .select("title description date location participants") // Select necessary fields
//   .populate({
//     path: "participants.user", // Populate the 'user' field inside participants
//     select: "username email profilePicture", // Select user details
//   })
//   .lean(); // Convert Mongoose document to plain object for easier filtering

// // Filter only attendees
// event.participants = event.participants.filter(participant => participant.role === "attendee");
    
//         if (!event) {
//           return res.status(404).json({ message: "Event not found" });
//         }
    
//         res.status(200).json(event);
//     } catch (error) {
//         console.error("Error fetching event:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }




exports.getEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Extract eventId from URL
    const { query } = req.query; // Extract search query
    console.log("Received event ID:", eventId, "Search query:", query);

    // Validate eventId format
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    // Fetch event details along with participants
    const event = await Event.findById(eventId)
      .select("title description date location participants")
      .populate({
        path: "participants.user",
        select: "username email profilePicture",
      })
      .lean(); // Convert to plain object for easier filtering

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Filter attendees who have role === "attendee"
    let attendees = event.participants.filter(
      (participant) => participant.role === "attendee"
    );

    // If search query is provided, filter attendees by username
    if (query) {
      attendees = attendees.filter((participant) =>
        participant.user.username.toLowerCase().includes(query.toLowerCase())
      );
    }
    console.log(" eve and attendee : ", attendees)
    // Return event details and filtered attendees
    res.status(200).json({ event, attendees });
  } catch (error) {
    console.error("Error fetching event attendees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
