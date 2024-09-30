import React from 'react';
// import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    {/* <AdminSidebar /> */}
    <div className="flex-1 overflow-auto">
      <Header />
      <main>{children}</main>
    </div>
  </div>
);

export default AdminLayout;