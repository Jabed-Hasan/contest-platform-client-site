import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Category = () => {
    return (
        <section className="text-center">
            <SectionTitle
                subHeading={"Previous Winners"}
                heading={"Contest Winners"}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <div>
                <SwiperSlide>
                    <img  className="w-[260px] h-[230px]" src="https://i.ibb.co/qydRRp1/happy-winner-portrait-beautiful-teen-260nw-1396308722.webp" alt="" />
             
                    <h3  className="w-[260px] h-[230px]" className="text-xl uppercase text-center -mt-1 text-black">Gaming Campions</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img  className="w-[260px] h-[230px]" src= "https://i.ibb.co/k0840kQ/happy-winner-portrait-handsome-teen-260nw-1355939219.webp" alt="" />
                    <h3 className="text-xl uppercase text-center -mt-1 text-black">Best Content-Writer</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img  className="w-[260px] h-[230px]" src="https://i.ibb.co/z4x6Gmh/image.png"alt="" />
                    <h3 className="text-xl uppercase text-center -mt-1 text-black">FPS-Gaming Chamipon</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img  className="w-[260px] h-[230px]" src="https://i.ibb.co/tqQNhfw/image.png" alt="" />
                    <h3 className="text-xl uppercase text-center -mt-1 text-black">Best Programmer</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img  className="w-[260px] h-[230px]" src="https://i.ibb.co/YQcRqZQ/image.png" alt="" />
                    <h3 className="text-xl uppercase text-center -mt-1 text-black">Poetry Champion</h3>
                </SwiperSlide>
                </div>
            </Swiper>
        </section>
    );
};

export default Category;


