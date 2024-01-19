import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import sliderimg1 from '../../../assets/home/01.jpg'
import sliderimg2 from '../../../assets/home/02.jpg'
import sliderimg3 from '../../../assets/home/03.png'
import sliderimg4 from '../../../assets/home/04.jpg'
import sliderimg5 from '../../../assets/home/05.png'
import sliderimg6 from '../../../assets/home/06.png'


export default function HomepageBanner() {
    return (
        <div>
            <Carousel>
                <div>
                    <img src={sliderimg1} />
                </div>
                <div>
                    <img src={sliderimg2} />
                </div>
                <div>
                    <img src={sliderimg3} />
                </div>
                <div>
                    <img src={sliderimg4} />
                </div>
                <div>
                    <img src={sliderimg5} />
                </div>
                <div>
                    <img src={sliderimg6} />
                </div>
            </Carousel>
        </div>
    )
}
