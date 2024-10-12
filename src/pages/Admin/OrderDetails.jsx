import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { usePost } from "../../api/usePost";
import { usePut } from "@/api/usePut";

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const [quotation, setQuotation] = useState('');
    const { id } = useParams();

    const getOrder = async () => {
        const { success, data } = await useGet('/order', { id });
        console.log("GET Order Response:", data); // Debug the response data
        if (success) {
            setOrder(data);
            setQuotation(data.quotation || '');
        }
    };

    useEffect(() => {
        getOrder();
    }, [id]);

    const handleQuotationChange = (e) => {
        setQuotation(e.target.value);
    };

    const sendQuotation = async () => {
        const { success, data } = await usePut(
            "/order/quote", 
            { 
                id, 
                
            },
            {
                quotation
            }
        );
        if (success) {
            alert("Quotation sent successfully");
            getOrder(); // Refresh the order to update the UI
        } else {
            alert("Failed to send quotation");
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    // Debug the order structure to ensure items are present
    console.log("Order Data:", order);
    console.log("Order Items:", order.items);

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
            {order.items.map((item, index) => {
                console.log(`Item ${index}:`, item); // Debug each item
                console.log(`Item ${index} Product Title:`, item.product);
                console.log(`Item ${index} Product URL:`, item.prodUrl);

                return (
                    <tr key={index}>
                        <td className="border p-2">
                            {item.prodUrl ? (
                                <a 
                                    href={item.prodUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:underline"
                                >
                                    {item.product}
                                </a>
                            ) : (
                                <span>{item.product}</span>
                            )}
                        </td>
                        <td className="border p-2">${item.price}</td>
                        <td className="border p-2">{item.quantity}</td>
                        <td className="border p-2">${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold">Quotation</h2>
                <input 
                    type="text" 
                    value={quotation} 
                    onChange={handleQuotationChange}
                    className="border p-2 w-full mb-2"
                    placeholder="Enter quotation"
                />
                <button 
                    onClick={sendQuotation}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Send Quotation
                </button>
            </div>
            <Link to="/orders" className="text-blue-600 hover:underline">Back to Orders</Link>
        </div>
    );
};

export default OrderDetails;
