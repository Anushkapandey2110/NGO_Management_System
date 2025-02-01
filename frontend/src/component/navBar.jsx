import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";




const NavBar = () => {
    const [activeTab, setActiveTab] = useState(null);

    const tabs = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Events", path: "/myEvents" },
        { name: "Profile", path: "/profile" }
    ];

    return (
        <div className="bg-gray-300 border-b m-2 rounded-xl">
            <div className="flex gap-4 p-4">
                {tabs.map((item) => (
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