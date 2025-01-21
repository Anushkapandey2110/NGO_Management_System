import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FooterPage from '../components/FooterPage';
// import QuestionnaireList from '../components/QuestionnaireList';
import Questionnaire from '../components/test_components/QuestionnaireList';
import AuthContext from '../context/AuthContext';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Notifications from '../pages/Notifications';
import Download from '../pages/Download';
import Error from '../components/Error';
import Login from '../pages/Login';  // ✅ Import Login Page
import { UserAnswersProvider } from '../context/UserAnswersContext';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
            {/* ✅ Login Route */}
        </Route>
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>  
        {/* <Route element={<Layout />}> */}
          <Route path="/download" element={<Download />} />
          <Route path="/survey" element={<Questionnaire />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute() {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    //console.log("Checking token:", token);
  }, [token]);
  // return  <Layout /> // remove this line when authentication feature is implemented
  return token ? <Layout /> : <Navigate to="/login" />;  // ✅ Redirect to /login if not authenticated
  // return token ? <Outlet /> : <Navigate to="/login" />;  // ✅ Redirect to /login if not authenticated
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <main className="flex-grow min-h-[90vh]">
      <UserAnswersProvider> 
        <Outlet />
        </UserAnswersProvider>
      </main>
      <FooterPage />
    </div>
  );
}

export default Router;
