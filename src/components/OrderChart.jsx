import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ orderHistory }) => (
    <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order History and Average Quotations</h2>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={orderHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
            <Bar yAxisId="right" dataKey="averageQuotation" fill="#82ca9d" name="Avg. Quotation ($)" />
        </BarChart>
        </ResponsiveContainer>
    </div>
);

export default ChartComponent;