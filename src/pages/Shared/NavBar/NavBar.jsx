import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useCreator from "../../../hooks/useCreator";

const defaultProfileImage = 'https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
    const location = useLocation();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error('Logout error:', error));
    }

    const isActive = (path) => {
        return location.pathname === path ? 
            "bg-blue-600 text-white" : "";
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/contests", label: "All Contests" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact Us" }
    ];

    // Function to truncate text with ellipsis
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Get display name with proper handling for empty values
    const displayName = user?.displayName || 'User';

    return (
        <div className="sticky top-0 z-50 w-full shadow-md bg-black text-white">
            <div className="navbar max-w-7xl mx-auto px-4 py-2">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.to} 
                                        className={`${isActive(link.to)} hover:bg-blue-500 hover:text-white`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-lg md:text-xl font-bold">
                        <span className="hidden sm:inline">Contest Platform</span>
                        <span className="sm:hidden">CP</span>
                    </Link>
                </div>
                
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-1">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.to} 
                                    className={`px-4 py-2 rounded-md ${isActive(link.to)} hover:bg-blue-600 hover:text-white`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <div className="flex items-center">
                            <div className="bg-gray-800 rounded-full py-1 px-3 mr-2 border border-gray-700 flex items-center">
                                <div className="hidden sm:block mr-2">
                                    <span className="font-medium text-sm text-gray-200">{truncateText(displayName, 12)}</span>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-circle btn-ghost avatar">
                                        <div className="w-10 rounded-full border-2 border-blue-500">
                                            <img 
                                                src={user?.photoURL || defaultProfileImage} 
                                                alt="User" 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {e.target.src = defaultProfileImage}}
                                            />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-64 mt-2 text-black">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="font-bold text-gray-800">{displayName}</p>
                                            <p className="text-sm text-gray-500 truncate">{user?.email || 'No email provided'}</p>
                                        </div>
                                        
                                        <li>
                                            <Link to="/dashboard/userHome" className="py-2 hover:bg-gray-100">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/dashboard/profile" className="py-2 hover:bg-gray-100">
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={handleLogOut} 
                                                className="py-2 text-red-500 hover:bg-red-50"
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login">
                                <button className="btn btn-sm md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-none">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup" className="hidden sm:block">
                                <button className="btn btn-sm md:btn-md btn-outline text-blue-500 hover:bg-blue-600 hover:text-white">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
