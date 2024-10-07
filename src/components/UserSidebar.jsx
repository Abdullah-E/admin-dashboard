// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Sidebar.css";

const UserSidebar = () => {
    console.log("UserSidebar");
    const location = useLocation();


    const isActive = (path) => {
        return location.pathname === `/user${path}` ? 'active' : '';
    }

    return (
        <div className="sidebar-container">
            <h1 className="sidebar-title">Keibo</h1>
            <div className="sidebar-user-info">
                <div className="sidebar-avatar"></div>
                <div>
                    <p className="sidebar-username">User</p>
                    <p className="sidebar-welcome">Welcome back!</p>
                </div>
            </div>
            <nav>
                <ul className="sidebar-nav">
                    <li className={isActive('/')}>
                        <Link to="/user/">Dashboard</Link>
                    </li>
                    <li className={isActive('/orders')}>
                        <Link to="/user/orders">My Orders</Link>
                    </li>
                    <li className={isActive('/profile')}>
                        <Link to="/user/profile">My Profile</Link>
                    </li>
                    <li className={isActive('/support')}>
                        <Link to="/user/support">Support</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default UserSidebar;