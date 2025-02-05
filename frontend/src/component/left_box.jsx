import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import React, { useContext, useEffect, useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Calendar, MapPin, Clock, Info } from 'lucide-react';

const FloatingPreview = ({ event, position }) => {
  if (!event || !position) return null;

  const previewPadding = 20; // Spacing from edges
  const maxHeight = window.innerHeight - previewPadding; // Prevents overflow
  
  const previewRef = React.useRef(null);
  const [adjustedTop, setAdjustedTop] = useState(position.y);

  useEffect(() => {
    if (previewRef.current) {
      const previewHeight = previewRef.current.offsetHeight;
      let newTop = position.y;

      // If preview is going beyond viewport, move it up
      if (position.y + previewHeight > maxHeight) {
        newTop = maxHeight - previewHeight;
      }

      setAdjustedTop(Math.max(newTop, previewPadding)); // Ensure it doesn't go offscreen at the top
    }
  }, [position]);

  return (
    <div
      ref={previewRef}
      className="fixed z-50 w-72 border bg-white rounded-lg shadow-xl p-4"
      style={{
        left: `${position.x + 20}px`,
        top: `${adjustedTop}px`,
        maxWidth: '300px',
      }}
    >
      <h3 className="text-lg font-semibold mb-3">{event.name}</h3>
      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-red-500" />
          <span>{event.location}</span>
        </div>
        <div className=" flex mt-2 text-sm text-gray-600">
          <Info className="w-4 h-5 mr-2" />
          <span>{event.description}</span> {/* Full description is now visible */}
        </div>
      </div>
    </div>
  );
};




const Leftbox = () => {
  const [event, setEvent] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [previewPosition, setPreviewPosition] = useState(null);
  const { token } = useContext(AuthContext);
  const HandleRegister = async (eventId) => {
    console.log("Registestration Triggered : ", eventId);
    try {
      console.log("Sent Register Request");
      const response = await axios.post(
        'http://localhost:3001/api/events/registerForEvent',
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response : ", response);
      if (response.status === 200) {
        setEvent(event.filter((event) => event._id !== eventId));
        alert('Successfully registered for the event!');
      } else {
        alert(response.data.message || 'Failed to register.');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      // alert('An error occurred while registering.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://localhost:3001/api/events/getEvent',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response: ", response.data.events);

        if (response.status === 200) {
          console.log('Answers submitted successfully:', response.data);
          setEvent(response.data.events);
        } else {
          console.error('Failed to fetch events:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);


  const handleMouseEnter = (event, e) => {
    setHoveredEvent(event);
    setPreviewPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
    setPreviewPosition(null);
  };

  return (
    <div className="col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[69vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500">
            {event.map((event, index) => (

              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50 transition-colors duration-200"
                onMouseEnter={(e) => handleMouseEnter(event, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => setPreviewPosition({ x: e.clientX, y: e.clientY })}
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                </div>
                <button onClick={() => HandleRegister(event._id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-red-600 transition-colors">
                  Register
                </button>
              </div>
            ))}
          </div>
          <FloatingPreview
            event={hoveredEvent}
            position={previewPosition}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Leftbox;



