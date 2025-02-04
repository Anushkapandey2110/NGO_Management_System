import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import AuthContext from "../../context/AuthContext";

const EventDetails = () => {
  const { eventId } = useParams();
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/events/getRegisteredEvents", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setEvent(response.data);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId, token]);

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
