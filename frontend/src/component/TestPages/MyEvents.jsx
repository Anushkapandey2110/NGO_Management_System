import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import AuthContext from "../../context/AuthContext";
const EventList = () => {
  const [events, setEvents] = useState([]);
  const { token }=useContext(AuthContext)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("sending Request")
        const response = await axios.get("http://localhost:3001/api/events/getRegisteredEvents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        if (response.status === 200) {
          setEvents(response.data.registeredEvents);
        } else {
          console.error("Failed to fetch events:", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="col-span-6">
    <Card className=''> 
      {/* <h2 className="text-2xl font-bold">Event List</h2> */}
      <CardHeader>
                <CardTitle >Event List</CardTitle>
              </CardHeader>
      {/* <div className="overflow-x-auto"> */}
      <CardContent>
      <div className="space-y-4 min-h-[69vh] " >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(events || []).length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
        </CardContent>
      {/* </div> */}
    </Card>
    </div>
  );
};

export default EventList;
