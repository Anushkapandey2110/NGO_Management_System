// components/Card.jsx
import React from "react";
const Card = ({ children, className = '' }) => {
    return (
      <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
        {children}
      </div>
    );
  };
  
  // components/CardHeader.jsx
  const CardHeader = ({ children, className = '' }) => {
    return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
  };
  
  // components/CardTitle.jsx
  const CardTitle = ({ children, className = '' }) => {
    return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
  };
  
  // components/CardContent.jsx
  const CardContent = ({ children, className = '' }) => {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
  };
  
  // components/Header.jsx
  const Header = () => {
    return (
      <header className="bg-black text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">NGO Management</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, John Doe (Admin)</span>
            <button className="px-3 py-1 rounded bg-gray-700">Logout</button>
          </div>
        </div>
      </header>
    );
  };
  
  // components/Navigation.jsx
  const Navigation = ({ activeTab, setActiveTab }) => {
    const navItems = ['Dashboard', 'Events', 'Create Event', 'Profile'];
    
    return (
      <nav className="bg-gray-600 border-b">
        <div className="flex gap-4 p-4">
          {navItems.map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded ${
                activeTab === item.toLowerCase() ? 'bg-white' : ''
              }`}
              onClick={() => setActiveTab(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    );
  };
  
  // components/EventList.jsx
  const EventList = ({ events }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.name} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // components/MainContent.jsx
  const MainContent = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <p>You have 3 upcoming events this week.</p>
            
            <h2 className="text-lg font-semibold mt-6">Your Role</h2>
            <p>You are logged in as: Admin</p>
            
            <h2 className="text-lg font-semibold mt-6">Quick Actions</h2>
            <ul className="list-disc pl-4">
              <li>View all events</li>
              <li>Create a new event</li>
              <li>Update your profile</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // components/CalendarSection.jsx
  const CalendarSection = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar className="w-full h-48" />
        </CardContent>
      </Card>
    );
  };
  
  // components/StatsSection.jsx
  const StatsSection = ({ stats }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(stats).map(([level, data]) => (
              <div key={level} className="flex justify-between items-center">
                <span className="capitalize">{level}</span>
                <span>
                  {data.count}/{data.total}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  export {Header};