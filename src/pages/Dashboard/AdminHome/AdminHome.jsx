import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers, FaClipboardList, FaTrophy, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6384'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [timeRange, setTimeRange] = useState('month');
    const [hasError, setHasError] = useState(false);

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/admin-stats');
                return res.data;
            } catch (error) {
                console.error("Error fetching admin stats:", error);
                setHasError(true);
                return { revenue: 0, users: 0, menuItems: 0, orders: 0 };
            }
        }
    });

    const { data: chartData = [], isLoading: chartLoading } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/order-stats');
                return res.data;
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setHasError(true);
                return [];
            }
        }
    });

    // Fallback data for the pie chart if real data fails to load
    const fallbackChartData = [
        { name: 'Design', value: 400 },
        { name: 'Development', value: 300 },
        { name: 'Writing', value: 200 },
        { name: 'Marketing', value: 100 },
    ];

    // Use real data or fallback data
    const pieChartData = chartData.length > 0 
        ? chartData.map(data => ({ name: data.category, value: data.revenue }))
        : fallbackChartData;

    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Recent users data (simulated)
    const recentUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Participant', joined: '2023-08-15' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Creator', joined: '2023-08-12' },
        { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Participant', joined: '2023-08-10' },
    ];

    // Recent contests data (simulated)
    const recentContests = [
        { id: 1, name: 'Logo Design Contest', participants: 24, status: 'Active' },
        { id: 2, name: 'Web Development Challenge', participants: 18, status: 'Ended' },
        { id: 3, name: 'Mobile App UI Contest', participants: 31, status: 'Active' },
    ];

    // Display error message instead of loading indicator if there was an error
    if (hasError) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Data Unavailable</h2>
                <p className="text-gray-600 mb-4">
                    There was an issue loading the dashboard data. This might be due to server connectivity problems.
                </p>
                <div className="flex space-x-4">
                    <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Try Again
                    </Link>
                    <Link to="/" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (statsLoading || chartLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center">
                        <div className="mr-6">
                            <img 
                                src={user?.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                                alt="Admin" 
                                className="w-16 h-16 rounded-full border-4 border-indigo-100"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                                Welcome back, Admin {user?.displayName || ""}!
                            </h1>
                            <p className="text-gray-600">
                                Here's what's happening with your platform today.
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="inline-flex rounded-md shadow-sm">
                            <button 
                                onClick={() => setTimeRange('week')}
                                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${timeRange === 'week' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                Week
                            </button>
                            <button 
                                onClick={() => setTimeRange('month')}
                                className={`px-4 py-2 text-sm font-medium ${timeRange === 'month' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => setTimeRange('year')}
                                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${timeRange === 'year' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                Year
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <FaDollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h3 className="text-xl font-bold">${stats.revenue || 0}</h3>
                            <p className="text-xs text-green-500">↗ +8% from last {timeRange}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-green-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <FaUsers size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h3 className="text-xl font-bold">{stats.users || 0}</h3>
                            <p className="text-xs text-green-500">↗ +12% from last {timeRange}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-amber-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                            <FaTrophy size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Contests</p>
                            <h3 className="text-xl font-bold">{stats.menuItems || 0}</h3>
                            <p className="text-xs text-green-500">↗ +5% from last {timeRange}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-purple-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <FaClipboardList size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Participations</p>
                            <h3 className="text-xl font-bold">{stats.orders || 0}</h3>
                            <p className="text-xs text-green-500">↗ +18% from last {timeRange}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue by Category</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `$${value}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Monthly Participations</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={[
                                { name: 'Jan', participations: 65 },
                                { name: 'Feb', participations: 59 },
                                { name: 'Mar', participations: 80 },
                                { name: 'Apr', participations: 81 },
                                { name: 'May', participations: 56 },
                                { name: 'Jun', participations: 55 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="participations" fill="#8884d8" name="Participations" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-800">Recent Users</h2>
                            <Link to="/dashboard/users" className="text-sm text-blue-600 hover:underline">View All</Link>
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map(user => (
                                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.role === 'Creator' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-800">Recent Contests</h2>
                            <Link to="/dashboard/manageItems" className="text-sm text-blue-600 hover:underline">View All</Link>
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Contest</th>
                                    <th className="px-6 py-3">Participants</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentContests.map(contest => (
                                    <tr key={contest.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{contest.name}</td>
                                        <td className="px-6 py-4">{contest.participants}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                contest.status === 'Active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {contest.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-800 rounded-xl shadow-md p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/dashboard/manageItems" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">📋</span>
                        <span className="font-medium">Manage Contests</span>
                    </Link>
                    <Link to="/dashboard/users" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">👥</span>
                        <span className="font-medium">Manage Users</span>
                    </Link>
                    <Link to="/contests" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">🏆</span>
                        <span className="font-medium">View Contests</span>
                    </Link>
                    <Link to="leaderboard" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">📊</span>
                        <span className="font-medium">Leaderboard</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;