import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from 'react-icons/fa';
import useCart from "../../../hooks/useCart";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/order">All Contest</Link></li>
        <li><Link to="/order/contact">Contact Us</Link></li>


    
    </>

    return (
        <>
            <div className="navbar  z-10 bg-orrange-400 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Contest Platform</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>

                <div className=" lg:navbar-end flex items-center gap-5">

                    {user ? (
                        <div className='flex items-center border-2 border-solid border-orange-500 pl-1 rounded-[50px]'>
                            <h1 className='font-bold text-sm md:text-sm lg:text-lg md:w-[160px]'>{user?.displayName}</h1>

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn m-1 btn-ghost btn-circle avatar border-2 border-solid border-black ">
                                    <button><img className="w-10 rounded-full border-orange-100" src={user?.photoURL} alt="User Avatar" /></button>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 my-2 shadow bg-base-100 rounded-box sm:w-48 md:w-52 lg:w-56">

                                    {user?.email ? (
                                        <div className="text-black flex flex-col items-center">
                                            <>
                                               
                                                <li className='w-[190px] items-center bg-gray-400 rounded-md my-2'>
                                                    <Link to="/dashboard/cart">
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <button onClick={handleLogOut} className="btn bg-orange-400 text-white hover:text-black text-sm md:text-base lg:text-sm">Sign Out</button>
                                            </>
                                        </div>
                                    ) : (
                                        <li className=' '> </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="btn bg-orange-400 text-white hover:text-black text-sm md:text-base lg:text-sm">Login</button>
                        </Link>
                    )}

                </div>
            </div>
        </>
    );
};

export default NavBar;