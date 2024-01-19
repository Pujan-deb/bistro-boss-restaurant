import { Helmet } from "react-helmet-async";
import useCart from "../../../../Hooks/useCart";
import SectionTitle from "../../../Home/Shared/SectionTitle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Mycart() {
    const [cart, refetch] = useCart()
    const navigate = useNavigate()
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const deleteitem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/${id}`, {
                    method: "DELETE"
                }).then(res => res.json()).then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "successfully deleted.",
                            icon: "success"
                        });
                    }
                })



            }
        });

    }
    return (
        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>Bistro Boss | Cart</title>
            </Helmet>
            <div>
                <SectionTitle heading={"My cart"} subheading={"Bistro Boss"}></SectionTitle>
                <h2 className="text-2xl font-extrabold text-yellow-600 text-center mb-4">Total price: ${totalPrice}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {cart.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                    <br />

                                </td>
                                <td>{item.price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => deleteitem(item._id)}><i className="fa-solid fa-trash text-red-600 text-xl"></i></button>
                                </th>
                            </tr>)}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
            <button className="btn btn-neutral btn-block my-4" onClick={() => navigate(`/dashboard/payment`)}>Pay</button>
        </div>
    )
}
