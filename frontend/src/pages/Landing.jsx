import React,{useContext} from 'react';
import RoleAuthContext from '../context/RoleAuthContext';


const Landing = () => {
  const { userRole }= useContext(RoleAuthContext)
  console.log(userRole);
  return <div className="text-center text-2xl">{userRole}Welcome to the Landing Page!</div>;
};

export default Landing;
