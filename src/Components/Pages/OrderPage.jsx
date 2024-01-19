import SectionCover from "../Home/Shared/SectionCover";
import orderCoverImg from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "../Home/Shared/FoodCard";
import './Menupage.css'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function Order() {
    const { catageory } = useParams()
    const catageories = ['salad', 'pizza', 'dessert', 'soup']
    const initialindex = catageories.indexOf(catageory)
    const [tabindex, setTabIndex] = useState(initialindex)
    const [menu, loading] = useMenu()
    const pizza = menu.filter(item => item.category === 'pizza')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')


    return (
        <div>
            <Helmet>
                <title>Bistroo Boss | Orders</title>
            </Helmet>
            <SectionCover img={orderCoverImg} Title={"OUR SHOP"} subTitle={"Would you like to try a dish?"}></SectionCover>
            <div className='mx-auto w-3/4'>
                <div >
                    <Tabs defaultIndex={tabindex} onSelect={(index) => setTabIndex(index)}>
                        <TabList>
                            <Tab>Salad</Tab>
                            <Tab>Pizza</Tab>
                            <Tab>Desserts</Tab>
                            <Tab>Soup</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    loading ?
                                        <span className="loading loading-spinner text-primary"></span>
                                        :
                                        salad.map(item => <FoodCard
                                            key={item._id} Foods={item}></FoodCard>)
                                }
                            </div>

                        </TabPanel>
                        <TabPanel>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    loading ?
                                        <span className="loading loading-spinner text-primary"></span>
                                        : pizza.map(item => <FoodCard
                                            key={item._id} Foods={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    loading ?
                                        <span className="loading loading-spinner text-primary"></span>
                                        : dessert.map(item => <FoodCard
                                            key={item._id} Foods={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-between">
                                {
                                    loading ?
                                        <span className="loading loading-spinner text-primary"></span>
                                        : soup.map(item => <FoodCard
                                            key={item._id} Foods={item}></FoodCard>)
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}
