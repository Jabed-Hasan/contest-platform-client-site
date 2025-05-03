import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaSearch, FaFilter, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const { data: users = [], refetch, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Filter and sort users based on search term and sort config
    useEffect(() => {
        let tempUsers = [...users];
        
        // Apply search filter
        if (searchTerm) {
            tempUsers = tempUsers.filter(user => 
                user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply sorting
        if (sortConfig.key) {
            tempUsers.sort((a, b) => {
                if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
                
                const aValue = a[sortConfig.key].toLowerCase();
                const bValue = b[sortConfig.key].toLowerCase();
                
                if (aValue < bValue) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        
        setFilteredUsers(tempUsers);
    }, [users, searchTerm, sortConfig]);

    // Get current users for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Request sort
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get sort icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort className="text-gray-400 ml-1" />;
        if (sortConfig.direction === 'ascending') return <FaSortUp className="text-blue-500 ml-1" />;
        return <FaSortDown className="text-blue-500 ml-1" />;
    };

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Make Admin?",
            text: `Are you sure you want to make ${user.name} an admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred while loading users. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                        <p className="text-gray-600 mt-1">Manage all platform users and their roles</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            Total Users: {users.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="relative mb-4 md:mb-0 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center hover:bg-gray-50"
                            onClick={() => setSearchTerm("")}
                        >
                            <FaFilter className="mr-2" />
                            <span>Reset Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th 
                                    scope="col" 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => requestSort('name')}
                                >
                                    <div className="flex items-center">
                                        Name
                                        {getSortIcon('name')}
                                    </div>
                                </th>
                                <th 
                                    scope="col" 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => requestSort('email')}
                                >
                                    <div className="flex items-center">
                                        Email
                                        {getSortIcon('email')}
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {indexOfFirstUser + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img 
                                                        className="h-10 w-10 rounded-full object-cover" 
                                                        src={user.photoURL || "https://i.ibb.co/7gnnx9J/profile-Image-934e5b10.png"} 
                                                        alt={user.name} 
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.role === 'admin' ? (
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                                                    >
                                                        <FaUserShield className="mr-1" size={14} />
                                                        <span>Make Admin</span>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors flex items-center"
                                                >
                                                    <FaTrashAlt className="mr-1" size={14} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        {searchTerm ? "No users match your search criteria." : "No users found."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > usersPerPage && (
                    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between items-center">
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(indexOfLastUser, filteredUsers.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredUsers.length}</span> results
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-md ${
                                        currentPage === 1
                                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                                            : "border-gray-300 text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 border rounded-md ${
                                        currentPage === totalPages
                                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                                            : "border-gray-300 text-blue-600 hover:bg-blue-50"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;