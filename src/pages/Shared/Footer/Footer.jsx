import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
            {/* Top Footer Section */}
            <div className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img 
                            className="w-12 h-12" 
                            src="https://i.ibb.co/rkYYqW5/image-removebg-preview.png" 
                            alt="Contest Platform Logo" 
                        />
                        <h2 className="text-2xl font-bold">Contest Platform</h2>
                    </div>
                    <p className="text-gray-300">
                        We connect talented individuals with exciting contests across various categories. 
                        Showcase your skills, compete, and win amazing prizes.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://facebook.com" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://twitter.com" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                            <FaTwitter size={20} />
                        </a>
                        <a href="https://instagram.com" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://linkedin.com" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                            <FaLinkedinIn size={20} />
                        </a>
                        <a href="https://youtube.com" className="hover:text-blue-400 transition-colors" aria-label="YouTube">
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b border-blue-500 pb-2 mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link to="/order" className="hover:text-blue-400 transition-colors">Contests</Link></li>
                        <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                        <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                        <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                        <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b border-blue-500 pb-2 mb-4">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <MdLocationOn size={24} className="text-blue-400 mt-1 flex-shrink-0" />
                            <span>123 Contest Street, Digital Avenue, CA 94107</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MdEmail size={20} className="text-blue-400 flex-shrink-0" />
                            <a href="mailto:info@contestplatform.com" className="hover:text-blue-400 transition-colors">
                                info@contestplatform.com
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <MdPhone size={20} className="text-blue-400 flex-shrink-0" />
                            <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                                +1 (234) 567-890
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Newsletter Signup */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold border-b border-blue-500 pb-2 mb-4">Subscribe</h3>
                    <p className="text-gray-300">Stay updated with our latest contests and announcements.</p>
                    <form className="mt-4 space-y-2">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500" 
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="bg-gray-950 py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>© {currentYear} Contest Platform. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;