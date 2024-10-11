import React from 'react';
import { Link } from 'react-router-dom';

const OrderTableComponent = ({ orders }) => {
    const getStatusBadge = (status) => {
        const colors = {
        'pending': 'bg-yellow-200 text-yellow-800',
        // '': 'bg-blue-200 text-blue-800',
        'in progress': 'bg-purple-200 text-purple-800',
        'completed': 'bg-green-200 text-green-800',
        };
        return <span className={`px-2 py-1 rounded ${colors[status] || 'bg-gray-200'}`}>{
            //capitalize:
            status.charAt(0).toUpperCase() + status.slice(1)
        }</span>;
    };

    const getQuotationStatusBadge = (status) => {
        const colors = {
        'pending': 'bg-yellow-200 text-yellow-800',
        'sent': 'bg-blue-200 text-blue-800',
        'accepted': 'bg-green-200 text-green-800',
        };
        return <span className={`px-2 py-1 rounded ${colors[status] || 'bg-gray-200'}`}>{
            //capitalize:
            status.charAt(0).toUpperCase() + status.slice(1)
        }</span>;
    };

    return (
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
                {orders.map((order) => (
                <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{getStatusBadge(order.order_status)}</td>
                    <td className="px-4 py-2">{getQuotationStatusBadge(order.quotation_status)}</td>
                    <td className="px-4 py-2">{order.quotation? `$${order.quotation.toFixed(2)}`:'N/A'}</td>
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
    );
};

export default OrderTableComponent;