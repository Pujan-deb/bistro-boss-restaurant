import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './MenuPage.css'
import image from '../../assets/others/authentication2.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Authinfo } from '../../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation()
    console.log(location)
    const redirect = location?.state?.from?.pathname || "/"
    const { login, passwordReset } = useContext(Authinfo)
    const [disable, SetDisable] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = data => {
        console.log(data);
        login(data.email, data.password)
            .then(() => {
                console.log("user logged in")
                navigate(redirect)
            }).catch((error) => {
                console.log(error.message)
            })
    }
    const resetPass = () => {
        passwordReset()
    }

    const HandleCaptcha = (e) => {
        console.log(e.target.value)
        if (validateCaptcha(e.target.value) === true) {
            console.log("Matched")
            SetDisable(false)
        } else {
            SetDisable(true)
        }
    }
    return (
        <div className='loginPage sm:px-0 md:px-14 lg:px-28'>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-transparent ">

                <div className="w-full hero-content flex-col md:flex-row justify-between items-center">
                    <div className="text-center lg:text-left">
                        <img src={image} alt="" className='w-fit' />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-3xl text-center font-bold">Login now!</h1>
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
                                <input type="password" {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500 font-semibold'>Please fill this!</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover" onClick={() => resetPass()}>Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={HandleCaptcha} name="captcha" placeholder="Type here" className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                {/* { disable button to be added} */}
                                <button disabled={disable} className="btn btn-primary">Login</button>
                                <p href="#" className="label-text-alt link link-hover text-center">Don't have account? <NavLink to={`/registration`} className='font-semibold text-pink-600'> Register</NavLink></p>
                                <SocialLogin></SocialLogin>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
