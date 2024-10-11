import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "@/api/useGet";

import OrderTableComponent from "@/components/OrderTable";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { success, data } = await useGet("/orders", { user_id: user.id });
        if (success) {
            setOrders(data);
        } else {
            alert("Failed to fetch orders");
        }
    };

    useEffect(() => {
        getOrders();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            
            <OrderTableComponent orders={orders} />
        </div>
    );
};

export default UserOrders;