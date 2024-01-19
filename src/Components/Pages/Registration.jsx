import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './MenuPage.css'
import image from '../../assets/others/authentication2.png'
import { Authinfo } from '../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';


export default function Registration() {
    const { Registration, updatename } = useContext(Authinfo)
    const navigate = useNavigate()
    const [disable, SetDisable] = useState(true)
    const captchaRef = useRef(null)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        Registration(data.email, data.password)
            .then(() => {
                console.log("user created")
                const saveuser = { name: data.name, email: data.email, role: "" }
                updatename(data.name)
                    .then(() => {
                        fetch("http://localhost:5000/user", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveuser)
                        }).then(res => res.json())
                            .then(() => {
                                navigate(`/`)
                            })

                    })
                    .catch(() => { })
            }).catch((error) => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const HandleCaptcha = () => {
        console.log(captchaRef.current.value)
        if (validateCaptcha(captchaRef.current.value) == true) {
            SetDisable(false)
        } else {
            SetDisable(true)
        }
    }


    return (
        <div className='loginPage sm:px-0 md:px-14 lg:px-28'>
            <Helmet>
                <title>Bistro Boss | Signup</title>
            </Helmet>
            <div className="hero min-h-screen bg-transparent ">

                <div className="w-full hero-content flex-col md:flex-row-reverse justify-between items-center">
                    <div className="text-center lg:text-left">
                        <img src={image} alt="" className='w-fit' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-3xl text-center font-bold">Register now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500 font-semibold'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500 font-semibold'>This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 8, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500 font-semibold'>Please fill this!</span>}
                                {errors.password && <span className='text-yellow-500 font-semibold'>{errors.password?.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='text-yellow-500 font-semibold'>minimum length in 8!</span>}
                                {errors.password?.type === 'pattern' && <span className='text-yellow-500 font-semibold'>Enter Uppercase,lowecase and number</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={HandleCaptcha} ref={captchaRef} name="captcha" placeholder="Type herer" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={disable} className="btn btn-primary">Register</button>
                                <p href="#" className="label-text-alt link link-hover text-center">Already have account? <span className='font-semibold text-pink-600'>Login</span></p>
                                <SocialLogin></SocialLogin>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
