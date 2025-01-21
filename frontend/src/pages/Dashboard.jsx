import React,{useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [decodedToken,setName]=useState(null);
  const token=localStorage.getItem('token')
  console.log("token :::: ",token)
  // const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
  useEffect(() => {
    const decoded = jwtDecode(token);
    console.log("decoded : ", decoded)
    setName(decoded);
  }, []);
  console.log(name)
  return  <div className="text-center text-2xl">
  {decodedToken ? (
    <>
      
      <p>Role: {decodedToken.role}</p>
      
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>;
};

export default Dashboard;
