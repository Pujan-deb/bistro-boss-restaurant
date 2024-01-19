import MenuitemCard from "../Menu/MenuitemCard";

export default function ShowCatageory({ items, cut }) {
    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-7 my-11">
            {
                cut ? items.slice(0, cut).map(item => <MenuitemCard key={item._id} menus={item}></MenuitemCard>) :
                    items.map(item => <MenuitemCard key={item._id} menus={item}></MenuitemCard>)
            }
        </div>
    )
}
