import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="space-y-16">
            <Helmet>
                <title>Contest Platform | Home Page</title>
            </Helmet>
            
            <Banner></Banner>
            <div className="max-w-7xl mx-auto px-4">
                <PopularMenu></PopularMenu>
                <Category></Category>
                <Featured></Featured>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;