import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, MessageSquare, User } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    const getProfilePath = () => {
        const pathParts = location.pathname.split('/');
        if (pathParts[1] === 'admin') {
            return '/admin/profile';
        } else if (pathParts[1] === 'user') {
            return '/user/profile';
        } else {
            return '/profile';
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <button className="text-gray-600">Help</button>
                <button className="text-gray-600">+050 2992 709</button>
                <button className="text-gray-600">English</button>
            </div>
            <div className="flex items-center space-x-4">
                <Bell className="text-gray-600" />
                <MessageSquare className="text-gray-600" />
                <Link to={getProfilePath()}>
                    <User className="text-gray-600 cursor-pointer" />
                </Link>
                <button onClick={logout} className="text-gray-600">Logout</button>
            </div>
        </header>
    );
};

export default Header;