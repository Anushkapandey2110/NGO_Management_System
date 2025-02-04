import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, MapPin, Clock, Info } from 'lucide-react';

const FloatingPreview = ({ event, position }) => {
  if (!event || !position) return null;

  return (
    <div
      className="fixed z-50 w-64 bg-white rounded-lg shadow-xl border"
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
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span>{event.location}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Click to view more details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leftbox = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [previewPosition, setPreviewPosition] = useState(null);

  const events = [
    { name: 'Community Cleanup', date: '2025-07-16', location: 'City Park' },
    { name: 'Fundraising Gala', date: '2025-08-01', location: 'Grand Hotel' },
    { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
    { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' },
    { name: 'Youth Mentorship Program', date: '2025-08-15', location: 'Community Center' }
  ];

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
          <div className="space-y-4 max-h-[69vh] overflow-y-auto">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded hover:bg-gray-50 transition-colors duration-200"
                onMouseEnter={(e) => handleMouseEnter(event, e)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={(e) => setPreviewPosition({ x: e.clientX, y: e.clientY })}
              >
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-red-600 transition-colors">
                  Delete
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