import SectionTitle from "./SectionTitle";
import image from '../../../assets/home/featured.jpg'
import './Feature.css'
export default function Featureed() {
    return (
        <div className="py-10 my-10 Featured-box text-white">
            <SectionTitle subheading={"---Check it out---"} heading={"FROM OUR MENU"} color={"white"}></SectionTitle>
            <div className="w-3/4 mx-auto grid lg:grid-cols-2 sm:grid-cols-1 gap-6 justify-around items-center mb-7">
                <div>
                    <img src={image} alt="" className="" />
                </div>
                <div className="space-y-3">
                    <p className="text-[24px]">March 20, 2023 <br />
                        WHERE CAN I GET SOME?</p>
                    <p className="text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="uppercase text-white px-6 py-2 shadow-xl shadow-slate-300">Read more</button>
                </div>

            </div>

        </div>
    )
}
