import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [stats, setStats] = useState({ totalOrders: 0, pendingQuotations: 0, acceptedQuotations: 0 });
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            // Simulated API calls
            setRecentOrders([
                { id: '001', created_at: '2024-10-01', status: 'Pending Quotation', total: null, quotation: { status: 'Pending', amount: 150.00 } },
                { id: '002', created_at: '2024-10-05', status: 'In Progress', total: 200.00, quotation: { status: 'Accepted', amount: 200.00 } },
                { id: '003', created_at: '2024-10-10', status: 'Pending Acceptance', total: null, quotation: { status: 'Sent', amount: 175.50 } },
                { id: '004', created_at: '2024-10-15', status: 'Completed', total: 180.00, quotation: { status: 'Accepted', amount: 180.00 } },
            ]);
            setStats({ totalOrders: 50, pendingQuotations: 8, acceptedQuotations: 42 });
            setOrderHistory([
                { month: 'May', orders: 10, averageQuotation: 160 },
                { month: 'Jun', orders: 15, averageQuotation: 175 },
                { month: 'Jul', orders: 8, averageQuotation: 155 },
                { month: 'Aug', orders: 12, averageQuotation: 180 },
                { month: 'Sep', orders: 18, averageQuotation: 190 },
                { month: 'Oct', orders: 15, averageQuotation: 185 },
            ]);
        };

        fetchDashboardData();
    }, []);

    const getStatusBadge = (status) => {
        const colors = {
            'Pending Quotation': 'bg-yellow-200 text-yellow-800',
            'Pending Acceptance': 'bg-blue-200 text-blue-800',
            'In Progress': 'bg-purple-200 text-purple-800',
            'Completed': 'bg-green-200 text-green-800',
        };
        return <span className={`px-2 py-1 rounded ${colors[status] || 'bg-gray-200'}`}>{status}</span>;
    };

    const getQuotationStatusBadge = (status) => {
        const colors = {
            'Pending': 'bg-yellow-200 text-yellow-800',
            'Sent': 'bg-blue-200 text-blue-800',
            'Accepted': 'bg-green-200 text-green-800',
        };
        return <span className={`px-2 py-1 rounded ${colors[status] || 'bg-gray-200'}`}>{status}</span>;
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Your Order Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded shadow">
                        <h2 className="font-semibold mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
                        <p className="text-3xl font-bold">{value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Order History and Average Quotations</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={orderHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                        <Bar yAxisId="right" dataKey="averageQuotation" fill="#82ca9d" name="Avg. Quotation ($)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Orders and Quotations</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Order Status</th>
                                <th className="px-4 py-2">Quotation Status</th>
                                <th className="px-4 py-2">Quotation Amount</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b">
                                    <td className="px-4 py-2">{order.id}</td>
                                    <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{getStatusBadge(order.status)}</td>
                                    <td className="px-4 py-2">{getQuotationStatusBadge(order.quotation.status)}</td>
                                    <td className="px-4 py-2">${order.quotation.amount.toFixed(2)}</td>
                                    <td className="px-4 py-2">
                                        <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Link to="/user/orders" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View All Orders
            </Link>
        </div>
    );
};

export default UserDashboard;