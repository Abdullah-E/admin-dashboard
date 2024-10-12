
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useGet } from '@/api/useGet';
import { ordersToMonthlyHistory } from '@/api/utils';

import OrderStats from '@/components/OrderStats';
import OrderChart from '@/components/OrderChart';
import OrderTable from '@/components/OrderTable';

const AdminDashboard = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    // const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, quotedOrders: 0 });
    const [orders, setOrders] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    useEffect(() => {
        const fetchDashboardData = async () => {
            const {success, data:orders} = await useGet('/orders', { order_by: 'created_at' });

            const recentOrders = orders.slice(0, 4);
            const orderHistory = ordersToMonthlyHistory(orders);

            setOrders(orders);
            setRecentOrders(recentOrders);
            setOrderHistory(orderHistory);
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            
            <OrderStats orders={orders} />
            <OrderChart orderHistory={orderHistory} />
            <OrderTable orders={recentOrders} />
            <Link to="/admin/orders" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View All Orders
            </Link>
        </div>
    );
};

export default AdminDashboard;
