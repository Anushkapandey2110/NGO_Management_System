import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from '../component/login'
import MainView from "../component/MainView";
import Dashboard from "../component/TestPages/Dashboard";
import CreateEvent from "../component/TestPages/CreateEvent";
import Profile from "../component/TestPages/Profile";
import AuthContext from "../context/AuthContext";
import Slash from "../component/TestPages/SlashPage";
import Home from "../component/TestPages/home";
import { useEffect } from "react";
import EventList from "../component/TestPages/MyEvents"
import EventDetails from "../component/TestPages/EventDetails";
import EventForm from "../component/TestPages/EventForm";
import { useRoleAuth } from "../context/RoleAuthContext";
import RoleBasedRoute from "./RoleBasedRoute";
const Router = () => {
  const { userRole } = useRoleAuth();
  return (

    <Routes>
      {/* Public Route for "/" */}
      <Route path="/"  >
        <Route index element={<Slash />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/*" element={<MainView />}>
          {/* Nested Routes for MidBox */}
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="myEvents" element={<EventList />} />
          <Route path="events/:eventId" element={<EventDetails />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route element={<RoleBasedRoute allowedRoles={["Employee"]} />}> */}
          <Route path="createEvent" element={<EventForm />} />
          {/* </Route> */}
        </Route>
      </Route>
      {/* <Route element={<RoleBasedRoute allowedRoles={["Employee"]} />}>
            <Route path="/createEvent" element={<EventForm />} />
          </Route> */}

      <Route path="/login" element={<Login />} />
    </Routes>

  );
};



// ✅ Private Route Function (Redirects to /login if not authenticated)
function PrivateRoute() {
  const { token, setLastAttemptedRoute } = useContext(AuthContext); // Get token from AuthContext



  useEffect(() => {
    console.log("Checking token:", token);
  }, [token]);
  return token ? <Outlet /> : <Navigate to="/login" />;
  // if (!token) {
  //   setLastAttemptedRoute(window.location.pathname); // Store the last attempted route
  //   return (
  //     <>
  //       <MainView />
  //       <Login />     
  //     </>
  //   );
  // }

  // return <Outlet />;
}

export default Router;