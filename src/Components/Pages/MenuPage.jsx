import { Helmet } from 'react-helmet-async';
import SectionCover from '../Home/Shared/SectionCover';
import menuCoverImg from '../../assets/menu/banner3.jpg'
import Desertimg from '../../assets/menu/dessert-bg.jpeg'
import pizzaimg from '../../assets/menu/pizza-bg.jpg'
import saladimg from '../../assets/menu/salad-bg.jpg'
import soupimg from '../../assets/menu/soup-bg.jpg'
import './Menupage.css'
import SectionTitle from '../Home/Shared/SectionTitle';
import useMenu from '../../Hooks/useMenu';
import MenuitemCard from '../Home/Menu/MenuitemCard';
import MenuTitle from '../Home/Menu/MenuTitle';
import ShowCatageory from '../Home/MenuCatageory/ShowCatageory';
import { NavLink } from 'react-router-dom';
export default function MenuPage() {
    const [menu] = useMenu()
    const TodayOffers = menu.filter(item => item.category === 'offered')
    const pizza = menu.filter(item => item.category === 'pizza')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <SectionCover img={menuCoverImg} Title={"OUR MENU"} subTitle={"Would you like to try a dish?"}></SectionCover>
            <SectionTitle subheading={"---Don't miss---"} heading={"TODAY'S OFFER"}></SectionTitle>
            <div className="mx-auto w-3/4">
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-7 my-11">
                    {
                        TodayOffers.map(item => <MenuitemCard key={item._id} menus={item}></MenuitemCard>)
                    }
                </div>
            </div>
            <MenuTitle img={Desertimg} menuTitle={"DESSERTS"} SubMenuTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuTitle>
            <div className='mx-auto w-3/4'>
                <ShowCatageory items={dessert} cut={6}></ShowCatageory>
                <div className="flex justify-center items-center mb-5">
                    <NavLink to={`/order/dessert`} className="uppercase text-[#1F2937] px-3 py-2 shadow-xl">view more</NavLink>
                </div>
            </div>
            <MenuTitle img={pizzaimg} menuTitle={"PIZZA"} SubMenuTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuTitle>
            <div className='mx-auto w-3/4'>
                <ShowCatageory items={pizza} cut={6} ></ShowCatageory>
                <div className="flex justify-center items-center mb-5">
                    <NavLink to={`/order/pizza`} className="uppercase text-[#1F2937] px-3 py-2 shadow-xl">view more</NavLink>
                </div>
            </div>
            <MenuTitle img={saladimg} menuTitle={"Salad"} SubMenuTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuTitle>
            <div className='mx-auto w-3/4'>
                <ShowCatageory items={salad} cut={6}></ShowCatageory>
                <div className="flex justify-center items-center mb-5">
                    <NavLink to={`/order/salad`} className="uppercase text-[#1F2937] px-3 py-2 shadow-xl">view more</NavLink>
                </div>
            </div>
            <MenuTitle img={soupimg} menuTitle={"Soup"} SubMenuTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuTitle>
            <div className='mx-auto w-3/4'>
                <ShowCatageory items={soup} cut={6}></ShowCatageory>
                <div className="flex justify-center items-center mb-5">
                    <NavLink to={`/order/soup`} className="uppercase text-[#1F2937] px-3 py-2 shadow-xl">view more</NavLink>
                </div>
            </div>


        </div>
    )
}
