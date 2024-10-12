import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "@/api/useGet";
// import { usePost } from "@/api/usePost";

import OrderTableComponent from "@/components/OrderTable";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { success, data } = await useGet("/orders", { id: user.id });
        if (success) {
            setOrders(data);
        } else {
            alert("Failed to fetch orders");
        }
    };

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            
            <OrderTableComponent orders={orders} />
        </div>
    );
};

export default Orders;