import SectionTitle from "../Shared/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import ShowCatageory from "../MenuCatageory/ShowCatageory";
import { NavLink } from "react-router-dom";

export default function PopularMenu() {
    const [menu] = useMenu()
    const popularitems = menu.filter(item => item.category === 'popular')

    return (
        <div>
            <SectionTitle subheading={"---Check it out---"} heading={"FROM OUR MENU"}></SectionTitle>
            <ShowCatageory items={popularitems}></ShowCatageory>
            <div className="flex justify-center items-center mb-5">
                <NavLink to={`/menu`} className="uppercase text-[#1F2937] px-3 py-2 shadow-xl">view full menu</NavLink>
            </div>

        </div>
    )
}
