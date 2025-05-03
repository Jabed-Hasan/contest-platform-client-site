import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import './Featured.css';

const Featured = () => {
    return (
        <section className="py-20">
            <SectionTitle 
                subHeading="Why Choose Us" 
                heading="Best Contest Platform" 
            />
            
            <div className="featured-item bg-fixed text-white py-16 my-12 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-black/80 to-black/60 py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/2">
                                <img 
                                    src="https://i.ibb.co/4PRVzYB/image.png" 
                                    alt="Featured Contest" 
                                    className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            
                            <div className="md:w-1/2 space-y-6">
                                <div className="badge badge-secondary">Featured</div>
                                <h3 className="text-3xl md:text-4xl font-bold">Unleash Your Creative Potential</h3>
                                <p className="text-gray-300">
                                    Our platform brings together talented individuals from around the world to 
                                    compete, collaborate, and showcase their skills. Whether you're a programmer, 
                                    writer, gamer, or artist, we have contests tailored to your unique abilities.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">✓</span> Fair judging system
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">✓</span> Amazing prizes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-blue-400">✓</span> Global recognition
                                    </li>
                                </ul>
                                <Link to={'/order'}>
                                    <button className="btn btn-primary mt-4">
                                        Explore All Contests
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;