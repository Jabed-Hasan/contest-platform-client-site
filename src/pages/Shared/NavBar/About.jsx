import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission with a delay
        setTimeout(() => {
            // Show SweetAlert notification upon form submission
            Swal.fire({
                icon: 'success',
                title: 'Message Sent',
                text: 'Thank you! Your message has been sent successfully.'
            });
            
            // Clear form fields after submission
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setIsSubmitting(false);
        }, 1000);
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-blue-600 text-2xl" />,
            title: "Our Location",
            details: "123 Contest Street, New York, NY 10001"
        },
        {
            icon: <FaPhone className="text-blue-600 text-2xl" />,
            title: "Phone Number",
            details: "+1 (555) 123-4567"
        },
        {
            icon: <FaEnvelope className="text-blue-600 text-2xl" />,
            title: "Email Address",
            details: "info@contestplatform.com"
        },
        {
            icon: <FaClock className="text-blue-600 text-2xl" />,
            title: "Working Hours",
            details: "Mon - Fri: 9:00 AM - 6:00 PM"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Contact Us | Contest Platform</title>
                <meta name="description" content="Get in touch with our team" />
            </Helmet>
            
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Have questions about our platform? Want to know more about our contests? 
                    We're here to help you every step of the way.
                </p>
            </div>
            
            {/* Contact Info Cards */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                                <p className="text-gray-600">{info.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Contact Form and Map Section */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Form Section */}
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                            <form id="contact-form" onSubmit={handleSubmit} method="POST">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        value={subject} 
                                        onChange={(e) => setSubject(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        rows="5" 
                                        required
                                        value={message} 
                                        onChange={(e) => setMessage(e.target.value)} 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                        
                        {/* Map Section */}
                        <div className="relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1637309850935!5m2!1sen!2s" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, minHeight: '400px' }} 
                                allowFullScreen="" 
                                loading="lazy"
                                title="Our Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="border-b border-gray-200 pb-4 mb-4 md:border-b-0 md:pb-0 md:mb-0 md:border-r md:pr-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I participate in a contest?</h3>
                            <p className="text-gray-600">To participate in a contest, simply navigate to the contest page, read the rules and requirements, and submit your entry before the deadline.</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4 mb-4 md:border-b-0 md:pb-0 md:mb-0 md:pl-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">How are contest winners selected?</h3>
                            <p className="text-gray-600">Contest winners are selected based on a variety of factors, including creativity, technical skill, and adherence to the contest guidelines. Some contests may include voting components.</p>
                        </div>
                        <div className="border-b border-gray-200 pb-4 mb-4 md:border-b-0 md:pb-0 md:mb-0 md:border-r md:pr-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">When do I receive my prize if I win?</h3>
                            <p className="text-gray-600">Prizes are typically awarded within 30 days of the contest end date. You will be notified via email if you are a winner.</p>
                        </div>
                        <div className="md:pl-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I create my own contest on the platform?</h3>
                            <p className="text-gray-600">Yes! You can create your own contest by registering as a contest creator. Our platform provides tools to help you set up, manage, and promote your contest.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
