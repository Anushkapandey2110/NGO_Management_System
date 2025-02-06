// // import { useParams, useNavigate } from "react-router-dom";
// // import { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// // import AuthContext from "../../context/AuthContext";

// // const EventDetails = () => {
// //   const { eventId } = useParams();
// //   const { token } = useContext(AuthContext);
// //   const [event, setEvent] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchEventDetails = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:3001/api/events/getRegisteredEvents", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (response.status === 200) {
// //           setEvent(response.data);
// //         } else {
// //           console.error("Failed to fetch event details");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching event details:", error);
// //       }
// //     };

// //     fetchEventDetails();
// //   }, [eventId, token]);

// //   const unregisterEvent = async () => {
// //     try {
// //       await axios.post(
// //         "http://localhost:3001/api/events/unregisterFromEvent",
// //         { eventId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       navigate("/myEvents"); // Redirect to event list after unregistering
// //     } catch (error) {
// //       console.error("Error unregistering from event:", error);
// //     }
// //   };

// //   if (!event) {
// //     return <div>Loading event details...</div>;
// //   }

// //   return (
// //     <div className="col-span-6">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>{event.title}</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
// //           <p><strong>Location:</strong> {event.location}</p>
// //           <p><strong>Description:</strong> {event.description}</p>

// //           <button
// //             onClick={unregisterEvent}
// //             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
// //           >
// //             Unregister from Event
// //           </button>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };



// // 

// // export default EventDetails;
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useContext, useEffect, useState } from "react";
// // import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// // import AuthContext from "../../context/AuthContext";

// // const EventDetails = () => {
// //   const { eventId } = useParams();
// //   const { user } = useContext(AuthContext); // Assuming user role is stored in context
// //   const [event, setEvent] = useState(null);
// //   const [showTaskForm, setShowTaskForm] = useState(false);
// //   const [taskTitle, setTaskTitle] = useState("");
// //   const [taskDescription, setTaskDescription] = useState("");
// //   const [dueDate, setDueDate] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [attendees, setAttendees] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const navigate = useNavigate();

// //   // Simulated event data
// //   useEffect(() => {
// //     const mockEvent = {
// //       id: eventId,
// //       title: "Mock Charity Event",
// //       date: new Date().toISOString(),
// //       location: "Community Hall, NY",
// //       description: "A charity event for a noble cause.",
// //       participants: [
// //         { user: { _id: "1", username: "Alice" } },
// //         { user: { _id: "2", username: "Bob" } },
// //         { user: { _id: "3", username: "Charlie" } },
// //       ],
// //     };
// //     setEvent(mockEvent);
// //     setAttendees(mockEvent.participants);
// //   }, [eventId]);

// //   // Unregister function simulation
// //   const unregisterEvent = () => {
// //     alert("You have unregistered from the event.");
// //     navigate("/myEvents"); // Redirect to event list after unregistering
// //   };

// //   // Filter attendees based on search
// //   const filteredAttendees = attendees.filter((attendee) =>
// //     attendee.user.username.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   // Assign task simulation
// //   const assignTask = () => {
// //     if (!selectedUser) {
// //       alert("Please select a user to assign the task.");
// //       return;
// //     }
// //     alert(`Task assigned to ${selectedUser.user.username}!`);
// //     setShowTaskForm(false);
// //   };

// //   const allowedRoles = ["Employee", "Admin", "SuperAdmin"];
// //   const canAssignTask = 1;

// //   if (!event) {
// //     return <div>Loading event details...</div>;
// //   }

// //   return (
// //     <div className="col-span-6">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>{event.title}</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
// //           <p><strong>Location:</strong> {event.location}</p>
// //           <p><strong>Description:</strong> {event.description}</p>

// //           {canAssignTask && (
// //             <button
// //               onClick={() => setShowTaskForm(!showTaskForm)}
// //               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
// //             >
// //               Assign Task
// //             </button>
// //           )}

// //           {showTaskForm && (
// //             <div className="mt-4 border p-4 rounded shadow-md">
// //               <h3 className="text-lg font-semibold mb-2">Assign a Task</h3>
// //               <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-2 border rounded mb-2" />
// //               <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-2 border rounded mb-2" />
// //               <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border rounded mb-2" />
// //               <input type="text" placeholder="Search attendee..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-2 border rounded mb-2" />
// //               <ul className="border rounded p-2 max-h-40 overflow-y-auto">
// //                 {filteredAttendees.map((attendee) => (
// //                   <li key={attendee.user._id} className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.user._id === attendee.user._id ? "bg-blue-200" : ""}`} onClick={() => setSelectedUser(attendee)}>
// //                     {attendee.user.username}
// //                   </li>
// //                 ))}
// //               </ul>
// //               {selectedUser && <p className="mt-2 text-sm">Assigning task to: <strong>{selectedUser.user.username}</strong></p>}
// //               <button onClick={assignTask} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Confirm Assignment</button>
// //             </div>
// //           )}

// //           <button onClick={unregisterEvent} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Unregister from Event</button>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default EventDetails;

// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
// import AuthContext from "../../context/AuthContext";
// import RoleAuthContext from "../../context/RoleAuthContext";
// const EventDetails = () => {
//   const { eventId } = useParams();
//   const { token } = useContext(AuthContext); // Assuming user role is stored in context
//   const { userRole } = useContext(RoleAuthContext);
//   const [event, setEvent] = useState(null);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDescription, setTaskDescription] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [attendees, setAttendees] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [Loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const eventt = location.state?.event; // Retrieve event from state
//   useEffect(() => {
//     setEvent(location.state?.event);
//     console.log("Eve id is ", eventId)
//   }, [token,])
//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setAttendees([]);
//       return;
//     }

//     setLoading(true);
//     const debounceTimeout = setTimeout(async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/events/getEventAttendee/${eventId}?query=${searchQuery}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         setAttendees(response.data.attendees);
//         console.log("res : ",response.data.attendees)
//       } catch (error) {
//         setUsers(response.data.users);
//         console.error("Error fetching users:", error);
//       }
//       setLoading(false);
//     }, 300); // 300ms debounce

//     return () => clearTimeout(debounceTimeout); // Cleanup timeout
//   }, [searchQuery]);
//   // Fetch event details
//   // useEffect(() => {
//   //   const fetchEventDetails = async () => {
//   //     try {
//   //       const response = await axios.get(`http://localhost:3001/api/events/getEvent/${eventId}`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });

//   //       if (response.status === 200) {
//   //         setEvent(response.data);
//   //         setAttendees(response.data.participants || []); // Assuming participants are included
//   //       } else {
//   //         console.error("Failed to fetch event details");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching event details:", error);
//   //     }
//   //   };

//   //   fetchEventDetails();
//   // }, [eventId, token]);

//   // Unregister from event
//   const unregisterEvent = async () => {
//     try {
//       await axios.post(
//         "http://localhost:3001/api/events/unregisterFromEvent",
//         { eventId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       navigate("/myEvents"); // Redirect to event list after unregistering
//     } catch (error) {
//       console.error("Error unregistering from event:", error);
//     }
//   };

//   // Filter attendees based on search
//   // const filteredAttendees = attendees.filter((attendee) =>
//   //   attendee.user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   // Assign task to selected user
//   const assignTask = async () => {
//     if (!selectedUser) {
//       alert("Please select a user to assign the task.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/tasks/assign",
//         {
//           eventId,
//           assignedTo: selectedUser.user._id,
//           title: taskTitle,
//           description: taskDescription,
//           dueDate,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 201) {
//         alert("Task assigned successfully!");
//         setShowTaskForm(false); // Hide form after task is assigned
//       }
//     } catch (error) {
//       console.error("Error assigning task:", error);
//       alert("Failed to assign task.");
//     }
//   };

//   // Check if user has permission to assign tasks
//   const allowedRoles = ["Employee", "Admin", "SuperAdmin"];
//   const canAssignTask = allowedRoles.includes(userRole);

//   if (!event) {
//     return <div>Loading event details...</div>;
//   }

//   return (
//     <div className="col-span-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>{event.title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
//           <p><strong>Location:</strong> {event.location}</p>
//           <p><strong>Description:</strong> {event.description}</p>

//           {/* Show "Assign Task" button only if the user has the right role */}
//           {canAssignTask && (
//             <button
//               onClick={() => setShowTaskForm(!showTaskForm)}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//             >
//               Assign Task
//             </button>
//           )}

//           {/* Task Assignment Form */}
//           {showTaskForm && (
//             <div className="mt-4 border p-4 rounded shadow-md">
//               <h3 className="text-lg font-semibold mb-2">Assign a Task</h3>

//               <input
//                 type="text"
//                 placeholder="Task Title"
//                 value={taskTitle}
//                 onChange={(e) => setTaskTitle(e.target.value)}
//                 className="w-full p-2 border rounded mb-2"
//               />

//               <textarea
//                 placeholder="Task Description"
//                 value={taskDescription}
//                 onChange={(e) => setTaskDescription(e.target.value)}
//                 className="w-full p-2 border rounded mb-2"
//               />

//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="w-full p-2 border rounded mb-2"
//               />

//               <input
//                 type="text"
//                 placeholder="Search attendee..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full p-2 border rounded mb-2"
//               />

//               <ul className="border rounded p-2 max-h-40 overflow-y-auto">
//                 {attendees.map((attendee) => (
//                   <li
//                     key={attendee.user._id}
//                     className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.user._id === attendee.user._id ? "bg-blue-200" : ""}`}
//                     onClick={() => setSelectedUser(attendee)}
//                   >
//                     {attendee.user.username}
//                   </li>
//                 ))}
//               </ul>

//               {selectedUser && (
//                 <p className="mt-2 text-sm">Assigning task to: <strong>{selectedUser.user.username}</strong></p>
//               )}

//               <button
//                 onClick={assignTask}
//                 className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//               >
//                 Confirm Assignment
//               </button>
//             </div>
//           )}

//           <button
//             onClick={unregisterEvent}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
//           >
//             Unregister from Event
//           </button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EventDetails;

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import AuthContext from "../../context/AuthContext";
import RoleAuthContext from "../../context/RoleAuthContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const { token } = useContext(AuthContext); 
  const { userRole } = useContext(RoleAuthContext);
  const [event, setEvent] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedModerators, setSelectedModerators] = useState([]); // State to track selected moderators
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setEvent(location.state?.event);
  }, [location.state]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAttendees([]);
      return;
    }

    setLoading(true);
    const debounceTimeout = setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/getEventAttendee/${eventId}?query=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendees(response.data.attendees);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const unregisterEvent = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/events/unregisterFromEvent",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/myEvents");
    } catch (error) {
      console.error("Error unregistering from event:", error);
    }
  };

  const handleAddModerator = (attendee) => {
    setSelectedModerators([...selectedModerators, attendee]);
    setSelectedUser(null); // Reset selected user
  };

  const handleRemoveModerator = (attendeeId) => {
    setSelectedModerators(selectedModerators.filter((moderator) => moderator.user._id !== attendeeId));
  };

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
        setShowTaskForm(false);
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task.");
    }
  };

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

          {canAssignTask && (
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Assign Task
            </button>
          )}

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
                {attendees.map((attendee) => (
                  <li
                    key={attendee.user._id}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedUser?.user._id === attendee.user._id ? "bg-blue-200" : ""}`}
                    onClick={() => setSelectedUser(attendee)}
                  >
                    {attendee.user.username}
                  </li>
                ))}
              </ul>

              {/* Selected Moderators Box */}
              <div className="mt-4">
                <h4 className="font-semibold">Selected Moderators:</h4>
                <div className="flex gap-2">
                  {selectedModerators.map((moderator) => (
                    <div key={moderator.user._id} className="bg-blue-200 p-2 rounded flex items-center">
                      <span>{moderator.user.username}</span>
                      <button
                        onClick={() => handleRemoveModerator(moderator.user._id)}
                        className="ml-2 text-red-500"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
