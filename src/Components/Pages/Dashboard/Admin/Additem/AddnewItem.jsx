import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../Home/Shared/SectionTitle";
import { Helmet } from "react-helmet-async";

export default function AddnewItem() {
    const imgToken = import.meta.env.VITE_IMG_TOKEN;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imguploadUrl = `https://api.imgbb.com/1/upload?key=${imgToken}`
    const [axiosSecure] = useAxiosSecure()
    const onSubmit = data => {
        console.log(data);
        const formdata = new FormData()
        formdata.append("image", data.image[0])

        fetch(imguploadUrl, {
            method: "POST", body: formdata
        }).then(res => res.json())
            .then(imageres => {
                console.log(imageres)
                if (imageres.success) {
                    const menu = data;
                    menu.image = imageres.data.display_url
                    menu.price = parseFloat(menu.price)
                    console.log(menu)
                    axiosSecure.post("/menus", menu)
                        .then(afterupload => {
                            console.log("data inserted", afterupload)
                        })

                }
            })


    }
    return (
        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>Add item</title>
            </Helmet>
            <SectionTitle subheading={`Bistroo Boss`} heading={`Add new items`}></SectionTitle>
            <form action="" onSubmit={handleSubmit((onSubmit))} className="font-semibold p-2 bg-[#ffffffe3]">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Food name*</span>
                    </label>
                    <input type="text" placeholder="Recipe" className="input input-bordered w-full" {...register("name", { required: true })} />
                    {errors.name && <span className='text-red-500 font-semibold'>This field is required</span>}
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Catageory</span>
                        </label>
                        <select defaultValue="Salad" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick one</option>
                            <option>pizza</option>
                            <option>soup</option>
                            <option>salad</option>
                            <option>dessert</option>
                        </select>
                        {errors.catageory && <span className='text-red-500 font-semibold'>This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                        {errors.price && <span className='text-red-500 font-semibold'>This field is required</span>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe details</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
                    {errors.recipe && <span className='text-red-500 font-semibold'>This field is required</span>}
                </div>
                <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs my-3" />
                {errors.image && <span className='text-red-500 font-semibold'>This field is required</span>}
                <input type="submit" value="Add" className="btn btn-block btn-neutral block" />
            </form>
        </div>
    )
}

