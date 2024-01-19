import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";

export default function Testimonial() {
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch("reviews.json")
            .then(res => res.json())
            .then(data => {

                setReview(data)
            })
    }, [])
    return (
        <div>
            <SectionTitle subheading={"---What Our Clients Say---"} heading={"TESTIMONIALS"}></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map(item => <SwiperSlide key={item._id}>
                        <div className="m-24 flex flex-col items-center justify-center gap-5 text-center">
                            <Rating style={{ maxWidth: 150 }} value={item.rating} />
                            <i className="fa-solid fa-quote-left text-[100px]"></i>
                            <p className="text-[#444] text-xl">{item.details}</p>
                            <h1 className="text-[26px] font-bold text-[#CD9003] text-center">{item.name}</h1>
                        </div>

                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}
