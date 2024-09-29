import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGet } from "../api/useGet";

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const { id } = useParams();

    const getOrder = async () => {
        const { success, data, error } = await useGet('/user/order', { id });
        if (success) {
            setOrder(data);
        }
    };

    useEffect(() => {
        getOrder();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <div className="mb-4">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
                <p><strong>Delivery Mode:</strong> {order.delivery_mode}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <p><strong>Address:</strong> {order.shipping_info.address}</p>
                <p><strong>City:</strong> {order.shipping_info.city}</p>
                <p><strong>State:</strong> {order.shipping_info.state}</p>
                <p><strong>Country:</strong> {order.shipping_info.country}</p>
                <p><strong>Post Code:</strong> {order.shipping_info.postCode}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Items</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Product</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2">{item.product}</td>
                                <td className="border p-2">${item.price}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/orders" className="text-blue-600 hover:underline">Back to Orders</Link>
        </div>
    );
};

export default OrderDetails;