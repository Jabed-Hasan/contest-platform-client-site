import React, { useState } from 'react';
import Swal from 'sweetalert2';

const About = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here (e.g., sending data to backend)

        // Show SweetAlert notification upon form submission
        Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent successfully.'
        });
        
        // Clear form fields after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="App my-10">
            <form id="contact-form" onSubmit={handleSubmit} method="POST" className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                    <textarea id="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default About;
