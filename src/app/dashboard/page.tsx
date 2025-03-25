"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { LucideUsers, LucideDollarSign, LucideShoppingCart } from "lucide-react";

const data = [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
];

const pieData = [
    { name: "Direct", value: 400 },
    { name: "Referral", value: 300 },
    { name: "Organic", value: 300 },
    { name: "Paid", value: 200 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-5 space-y-5">
            <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="bg-gray-800 p-5 flex items-center gap-4">
                    <LucideUsers size={40} className="text-blue-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Items</h2>
                        <p className="text-2xl font-bold">1,250</p>
                    </div>
                </Card>
                <Card className="bg-gray-800 p-5 flex items-center gap-4">
                    <LucideShoppingCart size={40} className="text-green-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Expiring Soon</h2>
                        <p className="text-2xl font-bold">340</p>
                    </div>
                </Card>
                <Card className="bg-gray-800 p-5 flex items-center gap-4">
                    <LucideDollarSign size={40} className="text-yellow-400" />
                    <div>
                        <h2 className="text-lg font-semibold">Revenue Increased</h2>
                        <p className="text-2xl font-bold">15%</p>
                    </div>
                </Card>
            </div>
            {/* Graphs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Sales Overview Chart */}
                <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-3">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                            <Bar dataKey="uv" fill="#4F46E5" barSize={50} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Traffic Source Pie Chart */}
                <div className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-3">Sales breakdown</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Recent Transactions */}
            <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                        <span>John Doe</span>
                        <span className="text-green-400">+$500</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                        <span>Jane Smith</span>
                        <span className="text-red-400">-$200</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                        <span>Michael Lee</span>
                        <span className="text-green-400">+$800</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
