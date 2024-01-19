import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import Swal from "sweetalert2"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"

export default function Allusers() {
    const [axiosSecure] = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure("/user")
            return res.data
        }
    })
    const HandleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/user/admin/${id}`, {
            method: "PATCH",
        }).then(res => res.json()).then(data => {
            Swal.fire({
                title: "Done",
                text: "Admin role added",
                icon: "success"
            });
            refetch()
            console.log(data)
        })
    }
    const deleteUser = (id) => {
        fetch(`http://localhost:5000/user/admin/${id}`, {
            method: "DELETE",
        }).then(res => res.json()).then(data => {
            Swal.fire({
                title: "!!",
                text: "User deleted!!",
                icon: "warning"
            });
            refetch()
            console.log(data)
        })
    }
    return (
        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>Bistroo Boss || Users</title>
            </Helmet>
            <h2 className="text-xl font-bold text-center">Total users: {users.length}</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white font-semibold text-xs">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role === 'admin' ? <p>admin</p> :

                                        <button onClick={() => HandleMakeAdmin(item._id)} ><i className="fa-solid fa-screwdriver-wrench text-xl p-3 bg-[#D1A054] rounded-lg text-white"></i></button>}</td>
                                    <td><button onClick={() => deleteUser(item._id)}><i className="fa-solid fa-trash text-white p-3 bg-red-600 rounded-lg text-xl"></i></button></td>
                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
