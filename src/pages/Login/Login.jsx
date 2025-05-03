import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome back to Contest Platform',
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#4F46E5'
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#EF4444'
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contest Platform | Login</title>
            </Helmet>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left Side - Image and Text */}
                    <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 p-12 text-white flex flex-col justify-center relative">
                        <div className="absolute inset-0 opacity-20">
                            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {[...Array(20)].map((_, i) => (
                                    <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={Math.random() * 2} fill="white" />
                                ))}
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                            <p className="text-lg mb-8">
                                Log in to access your account and participate in exciting contests. Show your talent and win amazing prizes!
                            </p>
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <p>Access to all contests</p>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <p>Track your contest submissions</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                <p>Connect with other contestants</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Login Form */}
                    <div className="md:w-1/2 p-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800">Login to Your Account</h2>
                            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="you@example.com" 
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="•••••••••" 
                                        className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
                                        required 
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <div></div>
                                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Security Check</label>
                                <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                                    <LoadCanvasTemplate />
                                </div>
                                <input 
                                    onBlur={handleValidateCaptcha} 
                                    type="text" 
                                    name="captcha" 
                                    placeholder="Enter the captcha above" 
                                    className="block w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
                                />
                            </div>
                            
                            <div>
                                <button 
                                    type="submit" 
                                    disabled={false} 
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account? 
                                <Link to="/signup" className="ml-1 text-indigo-600 hover:text-indigo-700 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                        
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;