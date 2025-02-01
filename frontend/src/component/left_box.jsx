import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import React, { useContext, useEffect, useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Calendar, MapPin, Clock, Info } from 'lucide-react';

const FloatingPreview = ({ event, position }) => {
  if (!event || !position) return null;

  return (
    <div 
      className="fixed z-50 w-64 border-solid-red bg-white rounded-lg shadow-xl border"
      style={{
        left: `${position.x + 20}px`,
        top: `${position.y}px`
      }}
    >
      <div className="p-4">
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
          <div className="flex mt-2 text-sm text-gray-600">
            <Info className="w-4 h-4 mr-2" />
            <span>{event.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leftbox = () => {
  const [eve, setEve] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [previewPosition, setPreviewPosition] = useState(null);
  const { token }=useContext(AuthContext);
  const HandleRegister = async (eventId) => {
    console.log("Registestration Triggered : ",eventId);
    try {
      console.log("Sent Register Request");
      const response = await axios.post(
        'http://localhost:3001/api/events/registerForEvent',
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response : ", response);
      if (response.status === 200) {
        alert('Successfully registered for the event!');
      } else {
        alert(response.data.message || 'Failed to register.');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      // alert('An error occurred while registering.');
    }
  };
  // const events = [
  //   { name: 'Community Cleanup', date: '2025-07-16', location: 'City Park' },
  //   { name: 'Fundraising Gala', date: '2025-08-01', location: 'Grand Hotel' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
  //   { name: 'Community Cleanup', date: '2025-07-16', location: 'City Park' },
  //   { name: 'Fundraising Gala', date: '2025-08-01', location: 'Grand Hotel' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
  //   { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' }
  // ];
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
          setEve(response.data.events);
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
          {eve.map((event, index) => (
            
              <div 
                key={index}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50 transition-colors duration-200"
                onMouseEnter={(e) => handleMouseEnter(event, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => setPreviewPosition({ x: e.clientX, y: e.clientY })}
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  {/* <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                  <p className="text-sm text-gray-500">{event.location}</p> */}
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



