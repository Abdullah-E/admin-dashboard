
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGet } from '../../api/useGet';

const AdminDashboard = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, quotedOrders: 0 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            const { success: ordersSuccess, data: ordersData } = await useGet('/user/recent-orders');
            const { success: statsSuccess, data: statsData } = await useGet('/user/dashboard-stats');

            if (ordersSuccess) setRecentOrders(ordersData);
            if (statsSuccess) setStats(statsData);
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded">
                    <h2 className="font-semibold mb-2">Total Orders</h2>
                    <p className="text-3xl">{stats.totalOrders}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                    <h2 className="font-semibold mb-2">Pending Orders</h2>
                    <p className="text-3xl">{stats.pendingOrders}</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                    <h2 className="font-semibold mb-2">Quoted Orders</h2>
                    <p className="text-3xl">{stats.quotedOrders}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr>
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Quotation</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{new Date(order.created_at).toLocaleDateString()}</td>
                            <td className="border p-2">{order.status}</td>
                            <td className="border p-2">{order.total ? `$${order.total.toFixed(2)}` : 'N/A'}</td>
                            <td className="border p-2">{order.hasQuotation ? 'Yes' : 'No'}</td>
                            <td className="border p-2">
                                <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/orders" className="text-blue-600 hover:underline">View All Orders</Link>
        </div>
    );
};

export default AdminDashboard;
