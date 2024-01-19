import { useContext } from "react";
import Swal from "sweetalert2";
import { Authinfo } from "../../../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";

export default function FoodCard({ Foods }) {
    const { name, image, recipe, price } = Foods;
    const { user } = useContext(Authinfo)
    const navigate = useNavigate()
    const location = useLocation()
    const [, refetch] = useCart()

    const AddtoCart = ({ name, image, recipe, price, _id }) => {
        if (user) {
            const cartinfo = { itemID: _id, name, image, recipe, price, Useremail: user.email }
            fetch("http://localhost:5000/addcart", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(cartinfo)
            }).then(res => res.json()).then(data => refetch())
        } else {
            Swal.fire({
                title: "opps",
                text: "You need to login first!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-[300px] bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-black text-yellow-600 absolute right-4 p-2 rounded-md top-3">${price}</p>
            <div className="text-center card-body flex flex-col items-center justify-between">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="flex sm:flex-col lg:flex-row gap-4 justify-center">
                    <button className="btn rounded-md px-4 py-2 border-b-4 border-b-black uppercase bg-slate-300 hover:text-yellow-600" onClick={() => AddtoCart(Foods)}>Add to cart</button>
                    <button className="btn rounded-md px-4 py-2 border-b-4 border-b-black uppercase bg-slate-300 hover:text-yellow-600" onClick={() => {
                        Swal.fire({
                            title: name,
                            text: recipe,
                            imageUrl: image,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image"
                        });
                    }}>Show details</button>
                </div>
            </div>


        </div>
    )
}
