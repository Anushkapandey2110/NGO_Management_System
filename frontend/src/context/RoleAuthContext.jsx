import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const RoleAuthContext = createContext();

export const RoleAuthProvider = ({ children }) => {
  const [userRole, setUser] = useState(null);
    
  useEffect(() => {
    // Extract the token from cookies
    const token=localStorage.getItem('token')
    console.log("token : ",token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("decoded : ",decoded);
        setUser(decoded.role); // Save the decoded user info, including role
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUser(null); // Clear user info on error
      }
    }
  }, []);

  return <RoleAuthContext.Provider value={{ userRole }}>{children}</RoleAuthContext.Provider>;
};

// Hook for accessing the user context
// export const UseRoleAuth = () => useContext(AuthContext);

export default RoleAuthContext;
