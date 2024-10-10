import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGet } from "@/api/useGet";
// import { usePost } from "@/api/usePost";
import { usePut } from "@/api/usePut";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [quotations, setQuotations] = useState({});

    const getOrders = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { success, data } = await useGet("/orders", { id: user.id });
        if (success) {
            setOrders(data);
            const initialQuotations = {};
            data.forEach(order => {
                initialQuotations[order.id] = order.quotation || '';
            });
            setQuotations(initialQuotations);
        } else {
            alert("Failed to fetch orders");
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleQuotationChange = (orderId, value) => {
        setQuotations(prev => ({ ...prev, [orderId]: value }));
    };

    const sendQuotation = async (orderId) => {
        const { success } = await usePut(
            "/order/quote", 
            { 
                id:orderId
            },
            {
                quotation: quotations[orderId]
            }
        );
        if (success) {
            alert("Quotation sent successfully");
            getOrders(); // Refresh the orders to update the UI
        } else {
            alert("Failed to send quotation");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            
            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr>
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Created At</th>
                        <th className="border p-2">Delivery Mode</th>
                        <th className="border p-2">Consignee</th>
                        <th className="border p-2">Shipping Address</th>
                        <th className="border p-2">Items</th>
                        <th className="border p-2">Quotation</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
                            <td className="border p-2">{order.delivery_mode}</td>
                            <td className="border p-2">
                                {`${order.consignee_info.firstName} ${order.consignee_info.lastName}`}
                                <br />
                                {order.consignee_info.emailAddress}
                                <br />
                                {order.consignee_info.mobileNumber}
                            </td>
                            <td className="border p-2">
                                {order.shipping_info.addressLine1}
                                <br />
                                {`${order.shipping_info.city}, ${order.shipping_info.stateRegion} ${order.shipping_info.postCode}`}
                                <br />
                                {order.shipping_info.country}
                            </td>
                            <td className="border p-2">
                                {order.items.map((item, index) => (
                                    <div key={index} className="mb-2">
                                        {item.product}
                                        <br />
                                        Price: {item.price}, Quantity: {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td className="border p-2">
                                <input 
                                    type="text" 
                                    value={quotations[order.id] || ''} 
                                    onChange={(e) => handleQuotationChange(order.id, e.target.value)}
                                    className="border p-1 w-full"
                                />
                                <button 
                                    onClick={() => sendQuotation(order.id)}
                                    className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                                >
                                    Send Quotation
                                </button>
                            </td>
                            <td className="border p-2">
                                <Link to={`/admin/order/${order.id}`} className="text-blue-600 hover:underline">
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