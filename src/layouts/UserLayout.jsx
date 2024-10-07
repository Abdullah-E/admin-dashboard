import React from 'react';
import UserSidebar from '../components/UserSidebar';
import Header from '../components/Header';

const UserLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <UserSidebar />
    <div className="flex-1 overflow-auto">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default UserLayout;