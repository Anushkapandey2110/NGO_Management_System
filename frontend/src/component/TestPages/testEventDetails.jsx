import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import AuthContext from "../../context/AuthContext";
import RoleAuthContext from "../../context/RoleAuthContext";
const EventDetails = () => {
  const { eventId } = useParams();
  const { token} = useContext(AuthContext); // Assuming user role is stored in context
  const { userRole } = useContext(RoleAuthContext);
  const [event, setEvent] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/getEvent/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setEvent(response.data);
          setAttendees(response.data.participants || []); // Assuming participants are included
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId, token]);

  // Unregister from event
  const unregisterEvent = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/events/unregisterFromEvent",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/myEvents"); // Redirect to event list after unregistering
    } catch (error) {
      console.error("Error unregistering from event:", error);
    }
  };

  // Filter attendees based on search
  const filteredAttendees = attendees.filter((attendee) =>
    attendee.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Assign task to selected user
  const assignTask = async () => {
    if (!selectedUser) {
      alert("Please select a user to assign the task.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/tasks/assign",
        {
          eventId,
          assignedTo: selectedUser.user._id,
          title: taskTitle,
          description: taskDescription,
          dueDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Task assigned successfully!");
        setShowTaskForm(false); // Hide form after task is assigned
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task.");
    }
  };

  // Check if user has permission to assign tasks
  const allowedRoles = ["Employee", "Admin", "SuperAdmin"];
  const canAssignTask = allowedRoles.includes(userRole);

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="col-span-6">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.description}</p>

          {/* Show "Assign Task" button only if the user has the right role */}
          {canAssignTask && (
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Assign Task
            </button>
          )}

          {/* Task Assignment Form */}
          {showTaskForm && (
            <div className="mt-4 border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">Assign a Task</h3>
              
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              <input
                type="text"
                placeholder="Search attendee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />

              <ul className="border rounded p-2 max-h-40 overflow-y-auto">
                {filteredAttendees.map((attendee) => (
                  <li
                    key={attendee.user._id}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.user._id === attendee.user._id ? "bg-blue-200" : ""}`}
                    onClick={() => setSelectedUser(attendee)}
                  >
                    {attendee.user.username}
                  </li>
                ))}
              </ul>

              {selectedUser && (
                <p className="mt-2 text-sm">Assigning task to: <strong>{selectedUser.user.username}</strong></p>
              )}

              <button
                onClick={assignTask}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Confirm Assignment
              </button>
            </div>
          )}

          <button
            onClick={unregisterEvent}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Unregister from Event
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;