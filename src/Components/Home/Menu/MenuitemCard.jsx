
export default function MenuitemCard({ menus }) {
    return (
        <div className="flex-col lg:flex-row justify-between gap-4 items-center shadow-xl rounded-md p-1">
            <div>
                <img src={menus.image} alt="food image" style={{ borderRadius: "0px 200px 200px 200px" }} className="w-[118px] h-[85px]" />
            </div>
            <div>
                <p className="text-[#151515] text-[22px] font-semibold">{menus.name}</p>
                <p className="text-[#737373] text-[18px] font-extralight">{menus.recipe}</p>
            </div>
            <div>
                <p className="text-[#BB8506] text-[18x] font-bold">${menus.price}</p>
            </div>
        </div>
    )
}


