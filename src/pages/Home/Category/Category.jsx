import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
    const winners = [
        {
            id: 1,
            image: "https://i.ibb.co/qydRRp1/happy-winner-portrait-beautiful-teen-260nw-1396308722.webp",
            title: "Gaming Champions",
            category: "Esports"
        },
        {
            id: 2,
            image: "https://i.ibb.co/k0840kQ/happy-winner-portrait-handsome-teen-260nw-1355939219.webp",
            title: "Best Content-Writer",
            category: "Writing"
        },
        {
            id: 3,
            image: "https://i.ibb.co/z4x6Gmh/image.png",
            title: "FPS-Gaming Champion",
            category: "Gaming"
        },
        {
            id: 4,
            image: "https://i.ibb.co/tqQNhfw/image.png",
            title: "Best Programmer",
            category: "Coding"
        },
        {
            id: 5,
            image: "https://i.ibb.co/YQcRqZQ/image.png",
            title: "Poetry Champion",
            category: "Literature"
        }
    ];

    return (
        <section className="py-16 bg-gray-50 rounded-xl">
            <SectionTitle
                subHeading="Celebrating Excellence"
                heading="Contest Winners"
            />
            
            <div className="max-w-5xl mx-auto px-4">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[Pagination, Autoplay, EffectCards]}
                    className="mySwiper"
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {winners.map(winner => (
                        <SwiperSlide key={winner.id}>
                            <div className="card bg-white shadow-xl">
                                <figure className="px-4 pt-4">
                                    <img 
                                        src={winner.image} 
                                        alt={winner.title} 
                                        className="rounded-xl h-64 w-full object-cover"
                                    />
                                </figure>
                                <div className="card-body text-center">
                                    <h2 className="text-2xl font-bold">{winner.title}</h2>
                                    <div className="badge badge-secondary mx-auto">{winner.category}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Category;


