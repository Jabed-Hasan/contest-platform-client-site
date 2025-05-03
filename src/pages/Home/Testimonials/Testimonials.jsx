import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://b8a12-server-side-jabed-hasan.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-16">
            <SectionTitle
                subHeading="Voices of Our Community"
                heading="Testimonials"
            />

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="bg-gray-50 py-10 px-4 rounded-xl">
                    <Swiper
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {reviews.map(review => (
                            <SwiperSlide key={review._id}>
                                <div className="flex flex-col items-center max-w-4xl mx-auto px-6 py-10">
                                    <div className="relative">
                                        <img 
                                            src={review.image || "https://i.ibb.co/8x9xK4H/team.jpg"} 
                                            alt={review.name}
                                            className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-primary"
                                        />
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white p-1 rounded-full">
                                            <FaQuoteLeft className="text-sm" />
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mt-6 text-primary">{review.name}</h3>
                                    
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                        className="my-4"
                                    />
                                    
                                    <p className="text-gray-600 text-center text-lg italic">"{review.details}"</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </section>
    );
};

export default Testimonials;