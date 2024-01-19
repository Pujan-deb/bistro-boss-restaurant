import './Menu.css'
import { Parallax } from 'react-parallax';
export default function MenuTitle({ img, menuTitle, SubMenuTitle }) {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[350px]" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className=" text-white Sectitle bg-[#15151599] py-10 px-10">
                        <h1 className="mb-2 text-[45px] font-bold">{menuTitle}</h1>
                        <p className="mb-5 text-[16px]">{SubMenuTitle}</p>
                    </div>
                </div>
            </div>
        </Parallax>
    )
}
