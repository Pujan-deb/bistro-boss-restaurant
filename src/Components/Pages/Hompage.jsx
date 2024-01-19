import { Helmet } from "react-helmet-async";
import HomepageBanner from "../Home/Banners/HomepageBanner";
import Catageory from "../Home/Catageories/Catageory";
import PopularMenu from "../Home/Menu/PopularMenu";
import Contact from "../Home/Shared/Contact";
import Description from "../Home/Shared/Description";
import Featureed from "../Home/Shared/Featureed";
import SectionTitle from "../Home/Shared/SectionTitle";
import Testimonial from "../Home/Shared/Testimonial";

export default function Hompage() {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <HomepageBanner></HomepageBanner>
            <div className="mx-auto w-3/4">
                <SectionTitle subheading={"---From 11:00am to 10:00pm---"} heading={"ORDER ONLINE"}></SectionTitle>
                <Catageory></Catageory>
                <Description></Description>
                <PopularMenu></PopularMenu>
                <Contact></Contact>
            </div>
            <div>
                <Featureed></Featureed>
            </div>
            <div className="mx-auto w-3/4">
                <Testimonial></Testimonial>
            </div>

        </div>
    )
}
