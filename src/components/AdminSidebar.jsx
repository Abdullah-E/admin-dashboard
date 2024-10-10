import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Sidebar.css";

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === `/admin${path}` ? 'active' : '';
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="sidebar-container">
            <h1 className="sidebar-title">Keibo</h1>
            <div className="sidebar-user-info">
                <div className="sidebar-avatar"></div>
                <div>
                    <p className="sidebar-username">{user.name}</p>
                    {/* <p className="sidebar-welcome">Welcome back!</p> */}
                </div>
            </div>
            <nav>
                <ul className="sidebar-nav">
                    <li className={isActive('/')}>
                        <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className={isActive('/orders')}>
                        <Link to="/admin/orders">All Orders</Link>
                    </li>
                    <li className={isActive('/users')}>
                        <Link to="/admin/users">Users</Link>
                    </li>
                    <li className={isActive('/profile')}>
                        <Link to="/admin/profile">My Profile</Link>
                    </li>
                    <li className={isActive('/support')}>
                        <Link to="/admin/support">Support</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;