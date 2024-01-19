import SectionCover from "../Home/Shared/SectionCover";
import image from '../../assets/others/authentication.gif'
import { useContext, useState } from "react";
import { Authinfo } from "../../Context/AuthProvider";
import userimg from '../../assets/others/profile.png'
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
export default function Settings() {
    const { user, updatename } = useContext(Authinfo)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(true)
    const onSubmit = data => {
        updatename(data.name)
            .then(() => {
                Swal.fire({
                    title: "Done",
                    text: "Username changed successfully",
                    icon: "success"
                });
            }).catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <div>
            <SectionCover img={image} Title={"Settings"}></SectionCover>
            <div className="mx-auto w-3/4">
                <div className="flex gap-4 items-center">
                    <div>
                        <img src={user.photoURL || userimg} alt="" className="w-[60px] h-[55px] rounded-full border border-purple-800" />
                    </div>

                    <div>
                        <h2 className="font-bold text-3xl">{user.email}</h2>
                        <p className="capitalize text-xl text-gray-500">{user.displayName}</p>
                    </div>
                </div>
                <div className="ml-[75px] mt-4">
                    <ul className="text-xl font-medium">
                        <li className="border border-gray-500 rounded-md p-2 shadow-xl mb-3 cursor-pointer" onClick={() => setShow(!show)}>Change username</li>
                        <form action="" className={`form-control mb-3 ${!show ? 'show' : 'hidden'}`} onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex gap-4">
                                <input type="text" {...register("name", { required: true })} placeholder="Enter name" className="input input-bordered input-primary w-4/5" />
                                <button className="btn btn-primary">change</button>
                            </div>
                            {errors.name && <span className='text-red-500 font-semibold'>This field is required</span>}
                        </form>

                        <li className="border border-gray-500 rounded-md p-2 shadow-xl mb-3 cursor-pointer">Change photo</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
