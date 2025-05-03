import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import ProfileUpdate from './ProfileUpdate';
import MuiChart from './MChart';
import { FaUser, FaEdit, FaEnvelope, FaCalendarAlt, FaTrophy, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [stats, setStats] = useState({
        contestsWon: 0,
        contestsParticipated: 0,
        totalSubmissions: 0,
        contestsCreated: 0
    });
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    // Simulate fetching user statistics
    useEffect(() => {
        // This would typically be an API call to get user stats
        const fetchUserStats = async () => {
            try {
                setLoading(true);
                // Replace with actual API call when available
                // const response = await axiosSecure.get(`/users/stats/${user.email}`);
                // setStats(response.data);
                
                // Simulated data for now
                setTimeout(() => {
                    setStats({
                        contestsWon: Math.floor(Math.random() * 5),
                        contestsParticipated: Math.floor(Math.random() * 15) + 5,
                        totalSubmissions: Math.floor(Math.random() * 20) + 10,
                        contestsCreated: Math.floor(Math.random() * 8)
                    });
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error fetching user stats:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserStats();
        }
    }, [user]);

    const joinDate = user?.metadata?.creationTime 
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Not available';

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-t-xl p-6 shadow-lg">
                <h1 className="text-3xl font-bold text-center">My Profile</h1>
                <p className="text-center text-blue-100 mt-2">Manage your account and view your contest statistics</p>
            </div>
            
            <div className="bg-white rounded-b-xl shadow-lg overflow-hidden mb-8">
                {/* Profile Section */}
                <div className="md:flex">
                    {/* Left Side - User Info */}
                    <div className="md:w-1/3 p-6 border-r border-gray-200">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    {user?.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt={user.displayName || "User"} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                            <FaUser className="text-blue-500 text-5xl" />
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={toggleEdit} 
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                                    title="Edit Profile"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold mt-4">{user?.displayName || "User"}</h2>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center mt-2">
                                <FaCheckCircle className="mr-1" /> Verified Account
                            </span>
                            
                            <div className="w-full mt-6 space-y-3">
                                <div className="flex items-center">
                                    <FaEnvelope className="text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium truncate">{user?.email || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">{joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Edit Profile or Stats */}
                    <div className="md:w-2/3 p-6">
                        {isEditing ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
                                <ProfileUpdate onComplete={() => setIsEditing(false)} />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold mb-6">Your Contest Statistics</h3>
                                
                                {loading ? (
                                    <div className="flex justify-center items-center h-40">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                <FaTrophy className="text-blue-600 text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Contests Won</p>
                                                <p className="text-2xl font-bold text-blue-600">{stats.contestsWon}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                                <FaFileAlt className="text-purple-600 text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Contest Participations</p>
                                                <p className="text-2xl font-bold text-purple-600">{stats.contestsParticipated}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-green-50 rounded-lg p-4 flex items-center">
                                            <div className="bg-green-100 p-3 rounded-full mr-4">
                                                <FaCheckCircle className="text-green-600 text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Total Submissions</p>
                                                <p className="text-2xl font-bold text-green-600">{stats.totalSubmissions}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-orange-50 rounded-lg p-4 flex items-center">
                                            <div className="bg-orange-100 p-3 rounded-full mr-4">
                                                <FaCalendarAlt className="text-orange-600 text-xl" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Contests Created</p>
                                                <p className="text-2xl font-bold text-orange-600">{stats.contestsCreated}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Win Overview Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="h-64">
                    <MuiChart />
                </div>
            </div>
            
            {/* Recent Contests - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Contest Activity</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Contest Name</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(3).fill(0).map((_, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : stats.contestsParticipated === 0 ? (
                                <tr className="bg-white border-b">
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                        No recent contest activity found. Join a contest to see your activity here!
                                    </td>
                                </tr>
                            ) : (
                                // Sample data that matches the screenshot
                                [
                                    {
                                        name: "Web Design Challenge",
                                        category: "Design",
                                        status: "Completed",
                                        date: "Jan 15, 2023"
                                    },
                                    {
                                        name: "Mobile App Innovation",
                                        category: "Mobile",
                                        status: "Active",
                                        date: "Feb 2, 2023"
                                    },
                                    {
                                        name: "Content Writing Competition",
                                        category: "Article",
                                        status: "Completed",
                                        date: "Dec 10, 2022"
                                    }
                                ].map((contest, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{contest.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {contest.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                contest.status === 'Active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {contest.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{contest.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Profile;
