import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import AuthContext from '../context/AuthContext';

const RightTop = () => {
    const [markedDates, setMarkedDates] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            if (!token) return; // Prevent API call if token is not available

            try {
                const response = await axios.get("http://localhost:3001/api/events/getRegisteredEvents", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const registeredEvents = response.data?.registeredEvents || [];
                if (response.status === 200 && registeredEvents.length > 0) {
                    const eventDates = registeredEvents.map(event => new Date(event.date));
                    setMarkedDates(eventDates);
                }
            } catch (error) {
                console.error('Error fetching registered events:', error);
            }
        };

        fetchRegisteredEvents();
    }, [token]); // Fetch again if token changes

    return (
            // {/* <CardHeader>
            //     <CardTitle className="text-lg">Calendar</CardTitle>
            // </CardHeader> */}
            // <Card className="min-h-[40vh]">
        // </Card>
        <Card >
            <CardContent >
                
                    <h3 className="text-lg font-bold mb-2">Your Event Calendar</h3>
                    <Calendar   className="border-none shadow-md bg-white rounded-lg p-3"
                        tileContent={({ date }) => 
                            markedDates.some(d => d.toDateString() === date.toDateString()) ? (
                                <div className="absolute inset-0 bg-blue-500 text-white flex items-center justify-center rounded-md">
                                    {date.getDate()}
                                </div>
                            ) : null
                        }
                        tileClassName="relative" // Ensure positioning is correct
                    />
                
            </CardContent>
            </Card>
            
                    
    );
};

export default RightTop;


// import React, { useContext, useEffect, useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
// import Calendar from 'react-calendar';
// import axios from 'axios';
// import 'react-calendar/dist/Calendar.css';
// import AuthContext from '../context/AuthContext';

const RiightTop = () => {
    const [markedDates, setMarkedDates] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            if (!token) return; // Prevent API call if token is not available

            try {
                const response = await axios.get("http://localhost:3001/api/events/getRegisteredEvents", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const registeredEvents = response.data?.registeredEvents || [];
                if (response.status === 200 && registeredEvents.length > 0) {
                    const eventDates = registeredEvents.map(event => new Date(event.date));
                    setMarkedDates(eventDates);
                }
            } catch (error) {
                console.error('Error fetching registered events:', error);
            }
        };

        fetchRegisteredEvents();
    }, [token]); // Fetch again if token changes

    return (
        // <Card className="min-h-[40vh] shadow-lg bg-white rounded-xl p-5">
           
            <CardContent>
                <div className="p-4 bg-gray-100 shadow-md rounded-lg">
                    <Calendar 
                        className="border-none shadow-md bg-white rounded-lg p-3"
                        tileContent={({ date }) => 
                            markedDates.some(d => d.toDateString() === date.toDateString()) ? (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold rounded-lg shadow-md">
                                    {date.getDate()}
                                </div>
                            ) : null
                        }
                        tileClassName={({ date }) => 
                            markedDates.some(d => d.toDateString() === date.toDateString()) 
                            ? 'relative text-white font-semibold' 
                            : 'text-gray-800'
                        }
                    />
                </div>
            </CardContent>
        // </Card>
    );
};

// export default RightTop;
