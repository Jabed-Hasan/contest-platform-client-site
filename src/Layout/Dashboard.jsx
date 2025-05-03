import { useState, useEffect } from "react";
import { 
    FaHome, 
    FaShoppingCart, 
    FaUser, 
    FaTrophy, 
    FaPlus, 
    FaTasks, 
    FaUsers, 
    FaList, 
    FaChevronLeft, 
    FaChevronRight, 
    FaChartLine, 
    FaBars, 
    FaSignOutAlt
} from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
    const { user, logOut } = useAuth();
    const location = useLocation();
    
    // State for mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    // Handle window resize for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
                setIsMobile(true);
            } else {
                setIsSidebarOpen(true);
                setIsMobile(false);
            }
        };

        // Initial check
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get the current page title
    const getCurrentPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'dashboard' || path === '') return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/([A-Z])/g, ' $1');
    };

    const adminNavItems = [
        { path: "adminHome", icon: <FaChartLine />, label: "Admin Home" },
        { path: "manageItems", icon: <FaList />, label: "Manage Contests" },
        { path: "users", icon: <FaUsers />, label: "All Users" },
    ];

    const creatorNavItems = [
        { path: "addItems", icon: <FaPlus />, label: "Add Contest" },
        { path: "myItems", icon: <FaTasks />, label: "My Contests" },
    ];

    const userNavItems = [
        { path: "userHome", icon: <FaHome />, label: "User Home" },
        { path: "cart", icon: <FaShoppingCart />, label: `My Participations (${cart.length})` },
        { path: "profile", icon: <FaUser />, label: "My Profile" },
        { path: "winnings", icon: <FaTrophy />, label: "My Winnings" },
    ];

    const sharedNavItems = [
        { path: "/", icon: <FaHome />, label: "Home Page" },
        { path: "/contests", icon: <FaList />, label: "All Contests" },
        { path: "leaderboard", icon: <FaChartLine />, label: "Leaderboard" },
    ];

    const navItems = isAdmin ? adminNavItems : isCreator ? creatorNavItems : userNavItems;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-3 px-4 flex justify-between items-center shadow-md">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md hover:bg-blue-600"
                >
                    <FaBars size={20} />
                </button>
                <h1 className="text-xl font-bold">Contest Platform</h1>
                {user && (
                    <div className="flex items-center">
                        <img 
                            src={user.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                            alt="User" 
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Dashboard Sidebar */}
                <div 
                    className={`
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        lg:translate-x-0 fixed lg:static top-0 left-0 h-screen z-40 
                        transition-transform duration-300 ease-in-out
                        bg-gradient-to-b from-blue-700 to-indigo-900 text-white 
                        ${isSidebarOpen ? 'w-64' : 'w-0'} lg:w-64 shadow-xl overflow-hidden
                    `}
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-blue-600">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-white bg-blue-600 w-8 h-8 flex items-center justify-center rounded-md mr-2">C</span>
                            <h2 className="text-xl font-bold">Contest Platform</h2>
                        </div>
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-blue-600"
                        >
                            <FaChevronLeft />
                        </button>
                    </div>

                    {/* User Profile */}
                    {user && (
                        <div className="py-5 px-4 border-b border-blue-600">
                            <div className="flex items-center">
                                <img 
                                    src={user.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                                    alt="User profile" 
                                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                />
                                <div className="ml-3">
                                    <h3 className="font-medium text-sm">{user.displayName || "User"}</h3>
                                    <p className="text-xs text-blue-200 truncate max-w-[180px]">
                                        {user.email || "user@example.com"}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-xs bg-blue-800 rounded-full py-1 px-3 inline-block">
                                    {isAdmin ? "Admin" : isCreator ? "Contest Creator" : "Participant"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="pb-6 pt-2 px-2 h-[calc(100vh-180px)] overflow-y-auto">
                        <div className="space-y-1">
                            <h3 className="px-4 py-2 text-xs font-semibold text-blue-300 uppercase">
                                Main Menu
                            </h3>
                            {navItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={`/dashboard/${item.path}`}
                                    className={({ isActive }) => 
                                        `flex items-center px-4 py-3 text-sm rounded-lg transition-colors 
                                        ${isActive 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-blue-100 hover:bg-blue-700'
                                        }`
                                    }
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-6">
                            <h3 className="px-4 py-2 text-xs font-semibold text-blue-300 uppercase">
                                Quick Links
                            </h3>
                            <div className="space-y-1">
                                {sharedNavItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className={({ isActive }) => 
                                            `flex items-center px-4 py-3 text-sm rounded-lg transition-colors 
                                            ${isActive 
                                                ? 'bg-blue-600 text-white' 
                                                : 'text-blue-100 hover:bg-blue-700'
                                            }`
                                        }
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}

                                <button
                                    onClick={logOut}
                                    className="w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors text-blue-100 hover:bg-red-600"
                                >
                                    <span className="mr-3"><FaSignOutAlt /></span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-x-hidden">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex justify-between items-center bg-white px-6 py-4 shadow-sm">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-4"
                            >
                                {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {getCurrentPageTitle()}
                            </h1>
                        </div>
                        
                        {user && (
                            <div className="flex items-center">
                                <NavLink 
                                    to="/dashboard/profile" 
                                    className="flex items-center hover:bg-gray-100 rounded-full py-1 pl-2 pr-3"
                                >
                                    <img 
                                        src={user.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                                        alt="User" 
                                        className="w-8 h-8 rounded-full mr-2 border border-gray-200"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.displayName || "User"}
                                    </span>
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Page Content */}
                    <div className="p-6 md:p-8 min-h-[calc(100vh-70px)] bg-gray-50">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && isMobile && (
                <div 
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Dashboard;