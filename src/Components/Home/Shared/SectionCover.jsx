import { Parallax } from 'react-parallax';
export default function SectionCover({ img, Title, subTitle }) {
    return (

        <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[500px]" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md text-white Sectitle">
                        <h1 className="mb-2 text-7xl font-bold">{Title}</h1>
                        <p className="mb-5 text-2xl">{subTitle}</p>
                    </div>
                </div>
            </div>
        </Parallax>

    )
}
