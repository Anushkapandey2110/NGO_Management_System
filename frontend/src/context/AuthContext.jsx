import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [lastAttemptedRoute, setLastAttemptedRoute] = useState(null);
  const navigate = useNavigate();


  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate(lastAttemptedRoute);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, setLastAttemptedRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
