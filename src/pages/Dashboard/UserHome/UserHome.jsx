import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { FaTrophy, FaCalendarAlt, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserHome = () => {
    const { user } = useAuth();
    const [cart] = useCart();
    const [stats, setStats] = useState({
        participated: 0,
        winnings: 0,
        upcomingDeadlines: 0,
        totalSpent: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentContests, setRecentContests] = useState([]);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            // Calculate total spent, ensuring it's a valid number
            let totalSpent = 0;
            try {
                totalSpent = cart.reduce((sum, item) => {
                    const price = parseFloat(item.price) || 0;
                    return sum + price;
                }, 0);
            } catch (error) {
                console.error("Error calculating total spent:", error);
            }

            setStats({
                participated: cart.length,
                winnings: Math.floor(Math.random() * 3), // Simulated data
                upcomingDeadlines: Math.floor(Math.random() * 5), // Simulated data
                totalSpent: totalSpent, // Ensure this is a number
            });

            // Create sample recent contests from cart data
            const recent = cart.slice(0, 3).map(item => ({
                ...item,
                deadline: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }));
            
            setRecentContests(recent);
            setLoading(false);
        }, 800);
    }, [cart]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Format totalSpent safely
    const formatTotalSpent = () => {
        try {
            // Ensure totalSpent is a number before calling toFixed
            const amount = typeof stats.totalSpent === 'number' ? stats.totalSpent : 0;
            return `$${amount.toFixed(2)}`;
        } catch (error) {
            console.error("Error formatting total spent:", error);
            return "$0.00";
        }
    };

    return (
        <div>
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:mr-6 mb-4 md:mb-0">
                        <img 
                            src={user?.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full border-4 border-blue-100"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            Welcome back, {user?.displayName || "Contestant"}!
                        </h1>
                        <p className="text-gray-600">
                            Here's an overview of your contest activities and performance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <FaShoppingCart size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Participations</p>
                            <h3 className="text-xl font-bold">{stats.participated}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <FaTrophy size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Winnings</p>
                            <h3 className="text-xl font-bold">{stats.winnings}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                            <FaCalendarAlt size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Upcoming Deadlines</p>
                            <h3 className="text-xl font-bold">{stats.upcomingDeadlines}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <FaUserAlt size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Spent</p>
                            <h3 className="text-xl font-bold">{formatTotalSpent()}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Contests */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Recent Participations</h2>
                    <Link to="/dashboard/cart" className="text-sm text-blue-600 hover:underline">
                        View All
                    </Link>
                </div>
                
                {recentContests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Contest</th>
                                    <th className="px-6 py-3">Entry Fee</th>
                                    <th className="px-6 py-3">Deadline</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentContests.map((contest, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">
                                            <div className="flex items-center">
                                                <img 
                                                    src={contest.image || "https://via.placeholder.com/50"} 
                                                    alt={contest.name} 
                                                    className="w-10 h-10 rounded-md object-cover mr-3"
                                                />
                                                <span>{contest.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">${parseFloat(contest.price || 0).toFixed(2)}</td>
                                        <td className="px-6 py-4">{contest.deadline}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                                In Progress
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>You haven't participated in any contests yet.</p>
                        <Link to="/contests" className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">
                            Browse Contests
                        </Link>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-md p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/contests" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">🏆</span>
                        <span className="font-medium">Browse Contests</span>
                    </Link>
                    <Link to="/dashboard/profile" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">👤</span>
                        <span className="font-medium">Update Profile</span>
                    </Link>
                    <Link to="/dashboard/leaderboard" className="bg-white/10 hover:bg-white/20 p-4 rounded-lg text-center transition-colors">
                        <span className="block text-3xl mb-2">📊</span>
                        <span className="font-medium">Leaderboard</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserHome;