import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useGet } from "../api/useGet";
// import { usePost } from "../api/usePost";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getOrders = async (page) => {
        const { success, data, meta } = await useGet("/user/orders/", { page });
        if (success) {
            setOrders(data);
            setTotalPages(meta.totalPages);
        }
    };

    useEffect(() => {
        getOrders(currentPage);
    }, [currentPage]);

    const acceptQuotation = async (orderId) => {
        const { success } = await usePost(`/user/accept-quotation/${orderId}`);
        if (success) {
            // Refresh the orders list
            getOrders(currentPage);
        } else {
            alert('Failed to accept quotation. Please try again.');
        }
    };

    // Sample order data
    const sampleOrder = {
        id: "SAMPLE-001",
        created_at: new Date().toISOString(),
        status: "Quoted",
        total: 199.99,
        hasQuotation: true
    };

    const displayOrders = orders.length > 0 ? orders : [sampleOrder];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            
            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr>
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Created At</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Total</th>
                        <th className="border p-2">Quotation</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="border p-2">{order.id}</td>
                            <td className="border p-2">{new Date(order.created_at).toLocaleString()}</td>
                            <td className="border p-2">{order.status}</td>
                            <td className="border p-2">{order.total ? `$${order.total.toFixed(2)}` : 'N/A'}</td>
                            <td className="border p-2">{order.hasQuotation ? 'Yes' : 'No'}</td>
                            <td className="border p-2">
                                <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline mr-2">
                                    View Details
                                </Link>
                                {order.status === 'Quoted' && (
                                    <button 
                                        className="text-green-600 hover:underline"
                                        onClick={() => acceptQuotation(order.id)}
                                    >
                                        Accept Quotation
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Orders;