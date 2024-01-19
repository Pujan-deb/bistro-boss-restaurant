import Swal from 'sweetalert2'
import useMenu from '../../../Hooks/useMenu'
import SectionTitle from '../../Home/Shared/SectionTitle'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

export default function ManageItems() {
    const [menu, loading, refetch] = useMenu()
    const [axiosSecure] = useAxiosSecure()
    const HandleDelete = (id) => {
        axiosSecure.delete(`http://localhost:5000/menus/${id}`)
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: "Done",
                    text: "Deleted successfully",
                    icon: "success"
                });
                refetch()
            })
    }
    return (
        <div className="w-4/5 mx-auto">
            <SectionTitle subheading={`Bistroo Boss`} heading={`Manage items`}></SectionTitle>
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
                            {menu.map((item, index) => <tr key={item._id}>
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
                                    <button className="btn btn-ghost btn-xs" onClick={() => HandleDelete(item._id)}><i className="fa-solid fa-trash text-red-600 text-xl"></i></button>
                                </th>
                            </tr>)}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
        </div>
    )
}
