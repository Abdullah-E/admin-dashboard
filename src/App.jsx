import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/orders" element={<Orders/>} />
              <Route path="/order/:id" element={<OrderDetails/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;