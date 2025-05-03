import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaSearch, FaFilter, FaSortAmountUp, FaEye, FaDollarSign, FaCalendarAlt, FaUsers } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    // Get unique categories from menu
    const categories = [...new Set(menu.map(item => item.category))];

    // Statistics
    const stats = {
        totalContests: menu.length,
        totalParticipants: menu.reduce((sum, item) => sum + (item.participantCount || 0), 0),
        totalPrize: menu.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0),
        activeContests: menu.filter(item => item.status !== 'completed').length
    };

    // Filter menu items based on search term and category
    useEffect(() => {
        let result = [...menu];
        
        if (searchTerm) {
            result = result.filter(item => 
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (categoryFilter) {
            result = result.filter(item => item.category === categoryFilter);
        }
        
        setFilteredMenu(result);
    }, [menu, searchTerm, categoryFilter]);

    // Reset filters
    const resetFilters = () => {
        setSearchTerm('');
        setCategoryFilter('');
    };

    // Get current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    // Format price as currency
    const formatPrice = (price) => {
        const num = parseFloat(price);
        return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Manage Contests</h1>
                <p className="text-gray-600">Manage all contests, update information, or remove contests from the platform.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <FaCalendarAlt size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Contests</p>
                        <h3 className="text-xl font-bold">{stats.totalContests}</h3>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <FaEye size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Active Contests</p>
                        <h3 className="text-xl font-bold">{stats.activeContests}</h3>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Participants</p>
                        <h3 className="text-xl font-bold">{stats.totalParticipants}</h3>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
                    <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Prize Money</p>
                        <h3 className="text-xl font-bold">{formatPrice(stats.totalPrize)}</h3>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search contests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        {/* Category Filter */}
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        
                        {/* Reset Filters */}
                        <button
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 flex items-center hover:bg-gray-50"
                            onClick={resetFilters}
                        >
                            <FaFilter className="mr-2" />
                            <span>Reset Filters</span>
                        </button>
                        
                        {/* Add Contest Button */}
                        <Link
                            to="/dashboard/addItems"
                            className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center hover:bg-blue-700"
                        >
                            <FaSortAmountUp className="mr-2" />
                            <span>Add Contest</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contest
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prize Money
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <img 
                                                        className="h-12 w-12 rounded-md object-cover" 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        onError={(e) => { e.target.src = "https://via.placeholder.com/48?text=Contest" }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-xs text-gray-500 truncate max-w-xs">
                                                        {item.details?.substring(0, 60)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {item.category || "General"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatPrice(item.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center">
                                                        <FaEdit className="mr-1" size={14} />
                                                        <span>Edit</span>
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
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
                                        {searchTerm || categoryFilter 
                                            ? "No contests match your search criteria." 
                                            : "No contests available."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredMenu.length > itemsPerPage && (
                    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between items-center">
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(indexOfLastItem, filteredMenu.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredMenu.length}</span> results
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

export default ManageItems;