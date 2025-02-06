const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // Link to the event
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Employee/Admin who assigned the task
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Attendee assigned
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
