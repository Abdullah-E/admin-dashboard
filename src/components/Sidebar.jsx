// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {
    const location = useLocation();

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
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className={location.pathname === '/orders' ? 'active' : ''}>
                        <Link to="/orders">My Orders</Link>
                    </li>
                    <li className={location.pathname === '/profile' ? 'active' : ''}>
                        <Link to="/profile">My Profile</Link>
                    </li>
                    <li className={location.pathname === '/support' ? 'active' : ''}>
                        <Link to="/support">Support</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;