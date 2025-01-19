import React, { useContext } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { NavButton } from './NavButton';
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-8">
        <div className="text-blue-400">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <Link to="/download"><NavButton style="hover:text-white transition-colors text-2xl">App</NavButton></Link>
          <Link to="/survey"><NavButton style="hover:text-white transition-colors text-2xl">Survey</NavButton></Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/notifications">
          <Bell className="h-9 w-9 text-gray-300 hover:text-white cursor-pointer" />
        </Link>
        <Link to="/dashboard">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
            <User className="h-9 w-9 text-gray-800 hover:text-white " />
          </div>
        </Link>
        {token && (
          <button onClick={handleLogout}>
            <LogOut className="h-9 w-9 text-gray-300 hover:text-red-500 cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
