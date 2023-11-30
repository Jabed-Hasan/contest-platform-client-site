import { useState } from 'react';
import orderCoverImg from '../../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import FoodCard from '../../../components/FoodCard/FoodCard';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    // Pagination
    const itemsPerPage = 10;
    const totalPages = Math.ceil(menu.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Calculate the range of items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, menu.length);

    return (
        <div>
            <Helmet>
                <title> | ALL CONTEST</title>
            </Helmet>
            <Cover img="https://i.ibb.co/tHcH5k0/image.png" title="All Contests"></Cover>

            <div className='grid md:grid-cols-3 gap-10 my-10'>
                {menu.slice(startIndex, endIndex).map(item => (
                    <FoodCard
                        key={item._id}
                        item={item}
                    ></FoodCard>
                ))}
            </div>

            <div className="flex justify-center mt-8 my-5">
                <button
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none ${
                        currentPage === 1 ? 'bg-blue-500' : 'hover:bg-blue-700'
                    }`}
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ${
                            currentPage === index + 1 ? 'bg-red-500' : 'hover:bg-blue-700'
                        } focus:outline-none`}
                        onClick={() => changePage(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none ${
                        currentPage === totalPages ? 'bg-blue-500' : 'hover:bg-blue-700'
                    }`}
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Order;
