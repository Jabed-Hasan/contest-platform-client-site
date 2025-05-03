import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { FaCalendarAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const FoodCard = ({ item }) => {
    const { name, image, price, details, _id, attemptCount, category } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const truncateDetails = (text, words) => {
        if (!text) return '';
        const wordArray = text.split(' ');
        const limit = window.innerWidth < 768 ? 10 : words;
        const truncatedText = wordArray.slice(0, limit).join(' ');
        return truncatedText + (wordArray.length > limit ? '...' : '');
    };

    const truncatedDetails = truncateDetails(details, 15);

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to register for this contest",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    
    return (
        <div className="card h-full bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-xl">
            <div className="relative">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-48 sm:h-56 object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="badge badge-sm md:badge-md bg-blue-600 text-white border-none">
                        {category || 'Contest'}
                    </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                    <span className="badge badge-sm md:badge-md bg-green-600 text-white border-none">
                        ${price || 0}
                    </span>
                </div>
            </div>
            
            <div className="card-body p-4">
                <h2 className="card-title text-lg sm:text-xl font-bold">
                    {name}
                </h2>
                
                <p className="text-gray-600 text-sm mt-1 mb-3">{truncatedDetails}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                        <FaUsers className="mr-1 text-blue-500" />
                        <span>{attemptCount || 0} Participants</span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-blue-500" />
                        <span>Ends in 3 days</span>
                    </div>
                </div>
                
                <div className="card-actions">
                    <Link 
                        to={`/details/${_id}`}
                        className="btn btn-sm md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-none w-full"
                    >
                        View Details
                    </Link>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="btn btn-sm md:btn-md btn-outline w-full mt-2 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default FoodCard;