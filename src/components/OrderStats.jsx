import React from 'react';

const OrderStats = ({ orders }) => { 
    const stats = {
        TotalOrders: orders.length,
        PendingAcceptance: orders.filter(order => order.quotation_status === 'sent').length,
        AcceptedQuotations: orders.filter(order => order.quotation_status === 'accepted').length,
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            ))}
        </div>
    )
};

export default OrderStats;