import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';

// User pages
import UserDashboard from './pages/User/Dashboard';
import Users from '@/pages/Users';
import Profile from '@/pages/Profile'
import UserOrders from './pages/User/Orders';
import OrderDetails from './pages/User/OrderDetails';
import Support from './pages/Support';

// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = () => {

  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    // console.log("checking auth", user!==null);
    return user !== null;
  };

  const isAdmin = () => {
    const user = localStorage.getItem('user');
    return user !== null && JSON.parse(user).role === 'admin';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected User Routes */}
        <Route
          path="/user/*"
          element={
            isAuthenticated() ? (
              <UserLayout>
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                  {/* <Route path="/users" element={<Users />} /> */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<UserOrders />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
                  <Route path="/support" element={<Support />} />
                </Routes>
              </UserLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated() && isAdmin() ? (
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  {/* Add other admin routes here */}
                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirect root to appropriate dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              isAdmin() ? <Navigate to="/admin" replace /> : <Navigate to="/user" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;