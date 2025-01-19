import React from 'react';
import { Bell, User, Play,SquareChevronDown } from 'lucide-react';

// NavBar Component
const NavBar = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-8">
        <div className="text-blue-400">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <button className="hover:text-white transition-colors">Dashboard</button>
          <button className="hover:text-white transition-colors">Team</button>
          <button className="hover:text-white transition-colors">Projects</button>
          {/* <button className="hover:text-white transition-colors">Calendar</button> */}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-800" />
        </div>
      </div>
    </div>
  );
};

// QuestionnaireItem Component
const QuestionnaireItem = ({ title, author, image }) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
          <img
            src="/api/placeholder/48/48"
            alt="Questionnaire icon"
            className="w-full h-full rounded-lg object-cover opacity-80"
          />
        </div>
        <div>
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <p className="text-gray-400">{author}</p>
        </div>
      </div>
      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg">
        <SquareChevronDown className="w-4 h-4" />
        {/* <span>Start</span> */}
      </button>
    </div>
  );
};

// Main QuestionnaireList Component
const QuestionnaireList = () => {
  const questionnaires = [
    {
      title: "Business Strategy Assessment",
      author: "Strategic Planning Team",
      image: "strategy.jpg"
    },
    {
      title: "Market Research Survey",
      author: "Research Department",
      image: "market.jpg"
    },
    {
      title: "Employee Satisfaction",
      author: "HR Department",
      image: "employee.jpg"
    }
  ];

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* <NavBar /> */}
      <div className="max-w-4xl mx-auto mt-0 p-4">
        <h2 className="text-white text-2xl font-bold mb-6">Available Questionnaires</h2>
        <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-lg divide-y divide-slate-700/50 backdrop-blur-sm shadow-xl">
          {questionnaires.map((questionnaire, index) => (
            <QuestionnaireItem
              key={index}
              title={questionnaire.title}
              author={questionnaire.author}
              image={questionnaire.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireList;