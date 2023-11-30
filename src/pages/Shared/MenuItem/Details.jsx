import React from 'react';
import useMenu from '../../../hooks/useMenu';
import DetailsCard from './DetailsCard';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cover from '../Cover/Cover';
import { IoMdPricetags } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import App from './CountDoun/App';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import Swal from 'sweetalert2';
// ... (import statements and other code)

// ... (import statements and other code)

const Details = () => {
   
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();
    const menu = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { name, image, price, details, attemptCount, _id, category, taskSubmissionText,contestDeadline } = menu;






   

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
                    console.log(res.data)
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
                text: "Please login to add to the cart?",
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

    console.log(menu);

    return (
        <div>
            <Cover img={image} title="Contest Details"></Cover>

            <div className="grid gap-4 md:grid-cols-4 my-10">
                <div className="border md:col-span-3 text-justify">
                    <h2 className="text-4xl my-6">{name}</h2>
                    <h2><span className='text-lg font-bold'>Description:</span> {details}</h2>
                    <p><span className='text-lg font-bold'>Task Submission:</span>{taskSubmissionText}</p>
                </div>
                <div className="border">
                    <div className='bg-gray-200 text-black'>
                        <App></App>
                        <div className='px-5 py-5'>
                            <h1 className='font-bold mt-5'>Details</h1>
                            <hr className="border-t border-black my-4" /> {/* Add this line for the horizontal rule */}
                            <div className='flex gap-4 items-center'>
                                <IoMdPricetags />
                                <p>Price: ${price}</p>
                            </div>
                            <p className='font-bold'>Total Participate: {attemptCount}</p>
                        </div>
                    </div>
                    <button onClick={handleAddToCart} className="btn btn-primary w-full my-5">Register</button>
                </div>
            </div>
        </div>
    );
};

export default Details;
