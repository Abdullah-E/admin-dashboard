import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGet } from "../api/useGet";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const {id} = useParams();

    const getOrders = async () => {
        const {success, data, error} = await useGet("/orders", {user_id:id});
        if(success){
            // console.log("Orders", data);
            setOrders(data);
        }
    };

    useEffect(() => {
        getOrders();
    }, [id]);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Created At</th>
                        <th className="border p-2">Consignee</th>
                        <th className="border p-2">Delivery Mode</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
                            <td className="border p-2">{`${order.consignee_info.firstName} ${order.consignee_info.lastName}`}</td>
                            <td className="border p-2">{order.delivery_mode}</td>
                            <td className="border p-2">
                                <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;