import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaUser, FaLock, FaEnvelope, FaImage } from 'react-icons/fa';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'Account created successfully',
                                        icon: 'success',
                                        confirmButtonText: 'Continue',
                                        confirmButtonColor: '#4F46E5'
                                    });
                                    navigate('/');
                                }
                            });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Try Again',
                            confirmButtonColor: '#EF4444'
                        });
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Registration Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#EF4444'
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Contest Platform | Sign Up</title>
            </Helmet>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left Side - Form */}
                    <div className="md:w-1/2 p-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
                            <p className="text-gray-600 mt-2">Join our community of talented contestants</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className={`pl-10 block w-full py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                        {...register("name", { required: true })} 
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                            </div>
                            
                            {/* Photo URL Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaImage className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="https://example.com/photo.jpg" 
                                        className={`pl-10 block w-full py-3 border ${errors.photoURL ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                        {...register("photoURL", { required: true })} 
                                    />
                                </div>
                                {errors.photoURL && <p className="text-red-500 text-sm mt-1">Photo URL is required</p>}
                            </div>
                            
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        placeholder="you@example.com" 
                                        className={`pl-10 block w-full py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                        {...register("email", { required: true })} 
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                            </div>
                            
                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="•••••••••" 
                                        className={`pl-10 block w-full py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-indigo-500 focus:border-indigo-500`}
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })} 
                                    />
                                </div>
                                <div className="space-y-1 mt-1">
                                    {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-500 text-sm">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-500 text-sm">Password must include uppercase, lowercase, number and special character</p>}
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account? 
                                <Link to="/login" className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium">
                                    Log in
                                </Link>
                            </p>
                        </div>
                        
                        <SocialLogin />
                    </div>
                    
                    {/* Right Side - Image and Text */}
                    <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 p-12 text-white flex flex-col justify-center relative">
                        <div className="absolute inset-0 opacity-20">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {[...Array(20)].map((_, i) => (
                                    <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 2} fill="white" />
                                ))}
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold mb-6">Join Our Community!</h1>
                            <p className="text-lg mb-8">
                                Create an account to participate in exciting contests, showcase your talent, and win amazing prizes. 
                            </p>
                            
                            <div className="space-y-6">
                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                    <h3 className="font-bold text-xl mb-2">Why Join?</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-300 font-bold">✓</span>
                                            <span>Participate in various categories of contests</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-300 font-bold">✓</span>
                                            <span>Connect with like-minded people</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-300 font-bold">✓</span>
                                            <span>Win prizes and get recognition</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;