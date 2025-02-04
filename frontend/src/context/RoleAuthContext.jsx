import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './AuthContext';

const RoleAuthContext = createContext();

export const RoleAuthProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // ✅ Get token from AuthContext
  const [userRole, setUserRole] = useState(null);

  // Function to set user role on login
  const setRole = (newToken) => {
    if (newToken) {
      try {
        const decoded = jwtDecode(newToken);
        setUserRole(decoded.role); // ✅ Set user role
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUserRole(null);
      }
    }
  };

  // Function to clear user role on logout
  const clearRole = () => {
    setUserRole(null);
  };

  // Effect to update role when token changes
  useEffect(() => {
    if (token) {
      setRole(token);
    } else {
      clearRole();
    }
  }, [token]); // ✅ Runs when token changes

  return (
    <RoleAuthContext.Provider value={{ userRole, setRole, clearRole }}>
      {children}
    </RoleAuthContext.Provider>
  );
};

// Hook to access role-based auth
export const useRoleAuth = () => useContext(RoleAuthContext);

export default RoleAuthContext;
