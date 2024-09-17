import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Keibo</h1>
        <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-white rounded-full mr-3"></div>
            <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-blue-300">Premium user</p>
            </div>
        </div>
        <nav>
            <ul className="space-y-2">
            <li className={location.pathname === '/' ? 'bg-blue-700 rounded p-2' : ''}>
                <Link to="/">Dashboard</Link>
            </li>
            <li>Orders</li>
            <li className={location.pathname === '/users' ? 'bg-blue-700 rounded p-2' : ''}>
                <Link to="/users">Users</Link>
            </li>
            <li>Chat</li>
            <li>Icons</li>
            <li>User Pages</li>
            </ul>
        </nav>
        </div>
    );
};

export default Sidebar;