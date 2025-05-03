import { Helmet } from "react-helmet-async";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alina Paisley",
      role: "CEO / Co-Founder",
      image: "https://i.ibb.co/ZYtJpn4/istockphoto-627909282-612x612.jpg",
      bio: "With over 15 years of experience in the competition industry, Alina leads our vision and strategy."
    },
    {
      id: 2,
      name: "Alison Breker",
      role: "Co-Founder",
      image: "https://i.ibb.co/JshfgmM/Screenshot-159.png",
      bio: "Alison brings a wealth of knowledge in event management and digital marketing to our platform."
    },
    {
      id: 3,
      name: "John Sina",
      role: "Lead Developer",
      image: "https://i.ibb.co/m0gFQYG/5065ddd0-d7ad-11ec-bffe-13e3a22e7c70.jpg",
      bio: "John oversees the technical aspects of our platform, ensuring a seamless experience for all users."
    }
  ];

  const achievements = [
    { number: "50+", label: "Contests Hosted", color: "from-blue-500 to-blue-600" },
    { number: "5,000+", label: "Active Users", color: "from-purple-500 to-purple-600" },
    { number: "25+", label: "Countries Reached", color: "from-green-500 to-green-600" },
    { number: "$100K+", label: "Prize Money", color: "from-amber-500 to-amber-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | Contest Platform</title>
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Contest Platform</h1>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
              We're dedicated to connecting talented individuals with exciting competitions.
              Our platform provides opportunities for people to showcase their skills, win prizes,
              and gain recognition in their fields.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="#FFFFFF" d="M30,60 C43,0 90,0 100,30 C110,60 157,60 170,0 C183,-60 130,-60 100,0 C70,60 17,120 30,60 Z" />
          </svg>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Contest Platform, we believe everyone deserves a chance to showcase their talents and be rewarded for their hard work. 
                Our mission is to democratize competition by providing a fair, transparent, and accessible platform for all.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We're committed to fostering a community of passionate creators, innovators, and problem-solvers 
                who push the boundaries of what's possible and inspire others with their work.
              </p>
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
                >
                  Get in Touch
                </a>
              </div>
            </div>
            <div>
              <img 
                src="https://i.ibb.co/tHcH5k0/image.png" 
                alt="Our mission" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-6 text-white text-center bg-gradient-to-r ${item.color}`}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{item.number}</div>
                <div className="text-sm md:text-base">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-800">Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Meet the passionate people behind Contest Platform who work tirelessly to bring you the best competition experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                      <FaInstagram size={20} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-800 transition-colors">
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-blue-100">
                We constantly strive to improve our platform, bringing new features and opportunities to our users.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Inclusivity</h3>
              <p className="text-blue-100">
                We believe in creating a platform that welcomes everyone, regardless of background or experience level.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-blue-100">
                We're committed to maintaining the highest standards in everything we do, from platform security to user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;