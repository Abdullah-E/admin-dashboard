import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGet } from '@/api/useGet';

import StatsComponent from '@/components/OrderStats';
import ChartComponent from '@/components/OrderChart';
import OrderTableComponent from '@/components/OrderTable';

const UserDashboard = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    // const [stats, setStats] = useState({ totalOrders: 0, pendingQuotations: 0, acceptedQuotations: 0 });
    const [orders, setOrders] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            // Simulated API calls
            const user = JSON.parse(localStorage.getItem('user'));
            const {success, data:orders} = await useGet('/orders', { user_id: user.id, order_by: 'created_at' });
            
            const recentOrders = orders.slice(0, 4);
            const orderHistory = []
            orders.forEach(order => {
                const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
                const existing = orderHistory.find(o => o.month === month);
                if (existing) {
                    existing.orders++;
                    existing.averageQuotation += order.quotation;
                } else {
                    orderHistory.push({ month, orders: 1, averageQuotation: order.quotation });
                }
            })
            orderHistory.forEach(o => o.averageQuotation /= o.orders);

            setOrders(orders);
            setRecentOrders(recentOrders);
            // setStats(stats);
            setOrderHistory(orderHistory);


        };

        fetchDashboardData();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Your Order Dashboard</h1>
            
            <StatsComponent orders={orders} />
            <ChartComponent orderHistory={orderHistory} />
            <OrderTableComponent orders={recentOrders} />

            <Link to="/user/orders" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View All Orders
            </Link>
        </div>
    );
};

export default UserDashboard;