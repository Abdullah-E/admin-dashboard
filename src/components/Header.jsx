import React from 'react';
import { Bell, MessageSquare, User } from 'lucide-react';

const Header = () => {
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
            <User className="text-gray-600" />
        </div>
        </header>
    );
};

export default Header;