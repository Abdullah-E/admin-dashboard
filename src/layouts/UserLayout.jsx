import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const UserLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 overflow-auto">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default UserLayout;