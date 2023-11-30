import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Contest Platform | Home</title>
            </Helmet>
            <Banner></Banner>

            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Category></Category>
            <Testimonials></Testimonials>
       
        </div>
    );
};

export default Home;