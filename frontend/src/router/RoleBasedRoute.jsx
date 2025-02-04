// components/RoleBasedRoute.js

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRoleAuth } from "../context/RoleAuthContext";
// allowedRoles
const RoleBasedRoute = ({ }) => {
    //   const { token } = useContext(AuthContext);
    //   const { userRole }= useRoleAuth();
    //   if (!token) {
    //     return <Navigate to="/login" />; // Redirect if not logged in
    //   }

    //   if (!allowedRoles.includes(userRole)) {
    //     return <Navigate to="/unauthorized" />; // Redirect if role is not authorized
    //   }

    return <Outlet />;
};

export default RoleBasedRoute;
