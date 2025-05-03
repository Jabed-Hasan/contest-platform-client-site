import { useState, useEffect } from 'react';
import useMenu from '../../../hooks/useMenu';
import { Helmet } from 'react-helmet-async';
import FoodCard from '../../../components/FoodCard/FoodCard';
import { FaFilter, FaSearch, FaTrophy, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Contest = () => {
    const [menu] = useMenu();
    const [displayMenu, setDisplayMenu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [isLoading, setIsLoading] = useState(true);

    // Pagination
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Categories
    const categories = ['all', 'gaming', 'writing', 'programming', 'art', 'music', 'photography'];

    useEffect(() => {
        setIsLoading(true);
        
        // Simulate loading time for data processing
        const timer = setTimeout(() => {
            let filteredMenu = [...menu];
            
            // Apply search filter
            if (searchTerm) {
                filteredMenu = filteredMenu.filter(item => 
                    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.details?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            // Apply category filter
            if (selectedCategory !== 'all') {
                filteredMenu = filteredMenu.filter(item => 
                    item.category?.toLowerCase() === selectedCategory.toLowerCase()
                );
            }
            
            // Apply sorting
            if (sortBy === 'popular') {
                filteredMenu.sort((a, b) => (b.attemptCount || 0) - (a.attemptCount || 0));
            } else if (sortBy === 'price-low') {
                filteredMenu.sort((a, b) => (a.price || 0) - (b.price || 0));
            } else if (sortBy === 'price-high') {
                filteredMenu.sort((a, b) => (b.price || 0) - (a.price || 0));
            }
            
            setTotalPages(Math.ceil(filteredMenu.length / itemsPerPage));
            
            // Get current page items
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setDisplayMenu(filteredMenu.slice(startIndex, endIndex));
            setIsLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [menu, searchTerm, selectedCategory, sortBy, currentPage, itemsPerPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page on new search
    };

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate page numbers with ellipsis for pagination
    const getPageNumbers = () => {
        let pages = [];
        const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;
        
        // Always show first page
        pages.push(1);
        
        // Calculate range around current page
        let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
        
        // Adjust if at bounds
        if (endPage < startPage) endPage = startPage;
        
        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push('ellipsis1');
        }
        
        // Add pages in range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push('ellipsis2');
        }
        
        // Always show last page if more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        
        return pages;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Contest Platform | All Contests</title>
            </Helmet>
            
            {/* Hero Banner */}
            <div className="relative">
                <div className="h-[30vh] md:h-[40vh] lg:h-[50vh] overflow-hidden">
                    <img 
                        src="https://i.ibb.co/tHcH5k0/image.png" 
                        alt="All Contests Banner" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
                                All Contests
                            </h1>
                            <p className="text-sm md:text-lg lg:text-xl max-w-3xl mx-auto">
                                Discover exciting competitions across different categories and showcase your talent
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
                {/* Search and Filter Section */}
                <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="col-span-1 md:col-span-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search contests..."
                                    className="w-full p-2 md:p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </form>
                        
                        {/* Category Filter */}
                        <div className="col-span-1">
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {setSelectedCategory(e.target.value); setCurrentPage(1);}}
                                    className="w-full p-2 md:p-3 pl-10 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        
                        {/* Sort By */}
                        <div className="col-span-1">
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}}
                                    className="w-full p-2 md:p-3 pl-10 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <FaStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 md:p-4 rounded-lg text-white text-center">
                        <FaTrophy className="mx-auto text-xl md:text-3xl mb-1 md:mb-2" />
                        <h3 className="text-xl md:text-2xl font-bold">{menu.length}+</h3>
                        <p className="text-xs md:text-sm">Active Contests</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 md:p-4 rounded-lg text-white text-center">
                        <div className="mx-auto text-xl md:text-3xl mb-1 md:mb-2">💰</div>
                        <h3 className="text-xl md:text-2xl font-bold">$10,000+</h3>
                        <p className="text-xs md:text-sm">In Prizes</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 md:p-4 rounded-lg text-white text-center">
                        <div className="mx-auto text-xl md:text-3xl mb-1 md:mb-2">👨‍💻</div>
                        <h3 className="text-xl md:text-2xl font-bold">5,000+</h3>
                        <p className="text-xs md:text-sm">Participants</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 md:p-4 rounded-lg text-white text-center">
                        <div className="mx-auto text-xl md:text-3xl mb-1 md:mb-2">🏆</div>
                        <h3 className="text-xl md:text-2xl font-bold">{categories.length - 1}</h3>
                        <p className="text-xs md:text-sm">Categories</p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : displayMenu.length > 0 ? (
                    // Contest Grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                        {displayMenu.map(item => (
                            <div key={item._id} className="transform transition duration-300 hover:scale-[1.02]">
                                <FoodCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    // No Results
                    <div className="text-center py-16 md:py-20 bg-white rounded-lg shadow">
                        <div className="text-4xl md:text-5xl mb-4">🔍</div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">No contests found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
                        <button 
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setSortBy('popular');
                                setCurrentPage(1);
                            }}
                            className="btn bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
                            <button
                                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                            >
                                <FaChevronLeft className="text-gray-700" />
                            </button>
                            
                            {getPageNumbers().map((page, index) => {
                                if (page === 'ellipsis1' || page === 'ellipsis2') {
                                    return (
                                        <span 
                                            key={`ellipsis-${index}`} 
                                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                
                                return (
                                    <button
                                        key={page}
                                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm ${
                                            currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                        }`}
                                        onClick={() => changePage(page)}
                                        aria-label={`Page ${page}`}
                                        aria-current={currentPage === page ? 'page' : undefined}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                            
                            <button
                                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                            >
                                <FaChevronRight className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contest;
