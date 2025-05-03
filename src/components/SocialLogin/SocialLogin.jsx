import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Login successful with Google',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            confirmButtonColor: '#4F46E5'
                        });
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error adding user to database:', error);
                    });
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

    return (
        <div className="p-6">
            <div className="relative flex items-center justify-center">
                <div className="absolute border-t border-gray-300 w-full"></div>
                <div className="relative px-4 bg-white">
                    <span className="text-sm text-gray-500">Or continue with</span>
                </div>
            </div>
            
            <div className="mt-6">
                <div className="grid grid-cols-3 gap-3">
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="w-full py-2.5 px-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
                    >
                        <FaGoogle className="text-red-500 mr-2" size={18} />
                        <span className="hidden sm:inline">Google</span>
                    </button>
                    
                    <button 
                        className="w-full py-2.5 px-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center cursor-not-allowed opacity-60"
                        disabled
                    >
                        <FaGithub className="text-gray-800 mr-2" size={18} />
                        <span className="hidden sm:inline">GitHub</span>
                    </button>
                    
                    <button 
                        className="w-full py-2.5 px-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center cursor-not-allowed opacity-60"
                        disabled
                    >
                        <FaFacebook className="text-blue-600 mr-2" size={18} />
                        <span className="hidden sm:inline">Facebook</span>
                    </button>
                </div>
                
                <p className="mt-4 text-xs text-center text-gray-500">
                    By signing in, you agree to our 
                    <a href="#" className="text-indigo-600 hover:text-indigo-700"> Terms of Service </a> 
                    and 
                    <a href="#" className="text-indigo-600 hover:text-indigo-700"> Privacy Policy</a>
                </p>
            </div>
        </div>
    );
};

export default SocialLogin;