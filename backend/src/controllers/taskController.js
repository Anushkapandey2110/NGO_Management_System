const Task = require("../models/taskModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.assignTask = async (req, res) => {
  try {
    const { eventId, assignedTo, title, description, dueDate } = req.body;
    const assignedBy = req.user.id;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Check if the assigned user is a participant
    const isParticipant = event.participants.some(p => p.user.toString() === assignedTo);
    if (!isParticipant) {
      return res.status(400).json({ success: false, message: "User is not an event attendee" });
    }

    // Create new task
    const newTask = new Task({
      event: eventId,
      assignedBy,
      assignedTo,
      title,
      description,
      dueDate,
    });

    await newTask.save();
    res.status(201).json({ success: true, message: "Task assigned successfully", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};
