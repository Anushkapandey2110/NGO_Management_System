import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './component/header';
import NavBar from './component/navBar';
import Leftbox from './component/left_box';
import MidBox from './component/midBox';
import RightTop from './component/rightTop';
import RightBottom from './component/rightBottom';





// Main Dashboard Component
const MainView = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <NavBar />
      <div className="mx-auto p-4 grid grid-cols-12 gap-4">
          <Leftbox />
          {/* <MidBox /> */}
          <Outlet />
          {/* <MidBox /> */}
          {/* Right Column - Calendar & Stats */}
          <div className="col-span-3 space-y-5">
            <RightTop />
            <RightBottom />
          </div>
      </div>
    </div>
  );
};

export default MainView;