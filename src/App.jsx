import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { Bell, MessageSquare, User } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const radarData = [
  { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
  { subject: 'Orders', A: 98, B: 130, fullMark: 150 },
  { subject: 'Revenue', A: 86, B: 130, fullMark: 150 },
  { subject: 'Customers', A: 99, B: 100, fullMark: 150 },
  { subject: 'Products', A: 85, B: 90, fullMark: 150 },
];

const StatCard = ({ title, value, change, chartData }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="text-2xl font-semibold">{value}</h3>
    <p className="text-blue-600">{title}</p>
    <p className="text-gray-500 text-sm">{change}</p>
    <div className="h-12 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Keibo</h1>
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-white rounded-full mr-3"></div>
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-blue-300">Premium user</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="bg-blue-700 rounded p-2">Dashboard</li>
            <li>Orders</li>
            <li>User</li>
            <li>Chat</li>
            <li>Icons</li>
            <li>User Pages</li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">Help</button>
            <button className="text-gray-600">+050 2992 709</button>
            <button className="text-gray-600">English</button>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-600" />
            <MessageSquare className="text-gray-600" />
            <User className="text-gray-600" />
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex space-x-4">
              <button className="text-blue-600">ICE Market data</button>
              <button className="text-blue-600">Own analysis</button>
              <button className="text-blue-600">Historic market data</button>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="bg-gray-200 px-2 py-1 rounded">&lt;</button>
              <button className="bg-gray-200 px-2 py-1 rounded">03/02/2019 - 20/08/2019</button>
              <button className="bg-gray-200 px-2 py-1 rounded">&gt;</button>
            </div>
            <div className="flex space-x-4">
              <select className="bg-gray-200 px-2 py-1 rounded">
                <option>All Day</option>
              </select>
              <button className="text-blue-600">Advanced Options</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">New</button>
              <select className="bg-gray-200 px-2 py-1 rounded">
                <option>Export</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard title="Visits" value="32,451" change="+14.00(+0.50%)" chartData={data} />
            <StatCard title="Impressions" value="15,236" change="+138.97(+0.54%)" chartData={data} />
            <StatCard title="Conversation" value="7,688" change="+57.62(+0.76%)" chartData={data} />
            <StatCard title="Downloads" value="1,553" change="+138.97(+0.54%)" chartData={data} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Sales Statistics Overview</h3>
              <p className="text-sm text-gray-500 mb-4">Lorem ipsum is placeholder text commonly used</p>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold">15,263</p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">$753,098</p>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Net Profit Margin</h3>
              <p className="text-sm text-gray-500 mb-4">Started collecting data from February 2019</p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="Sales" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Orders" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
              <p className="text-2xl font-bold">184.42K</p>
              <p className="text-green-500">+1.37%</p>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Transaction</h3>
              <p className="text-2xl font-bold">147.7K</p>
              <p className="text-red-500">-3.87%</p>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={data}>
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Website Audience Metrics</h3>
              <p className="text-sm text-gray-500">Pages Views</p>
              <p className="text-2xl font-bold">523,200</p>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={data}>
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;