import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useRoleAuth } from "../context/RoleAuthContext"
import RoleBasedRoute from "../context/RoleAuthContext";

const NavBar = () => {
    const [activeTab, setActiveTab] = useState(null);
    const { userRole } = useRoleAuth();
    const tabs = [
        { name: "Dashboard", path: "/dashboard", roles: ["User", "Employee"] },
        { name: "My Events", path: "/myEvents", roles: ["User", "Employee"] },
        { name: "Profile", path: "/profile", roles: ["User", "Employee"] },
        { name: "Create Event", path: "/createEvent", roles: ["Employee"] } // Admin only
    ];


    return (
        <div className="bg-gray-300 border-b m-2 rounded-xl">
            <div className="flex gap-4 p-4">
                {tabs
                    .filter(tab => tab.roles.includes(userRole)) // Filter tabs based on role
                    .map((item) => (
                        <div key={item.name}> {/* Moved key here */}
                            <Link to={item.path}>
                                <button
                                    className={`px-4 py-2 rounded ${activeTab === item.name.toLowerCase() ? 'bg-white' : ''}`}
                                    onClick={() => setActiveTab(item.name.toLowerCase())}
                                >
                                    {item.name}
                                </button>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};




export default NavBar