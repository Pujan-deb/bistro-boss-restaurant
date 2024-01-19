import { NavLink, useNavigate } from 'react-router-dom'
import img from '../../../assets/others/user.png'
import './Feature.css'
import { useContext } from 'react'
import { Authinfo } from '../../../Context/AuthProvider'
import useCart from '../../../Hooks/useCart'
import useAdmin from '../../../Hooks/useAdmin'
export default function Header() {
    const { user, logout } = useContext(Authinfo)
    const navigate = useNavigate()
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const navoptions = <>
        <li><NavLink to={`/`}>Home</NavLink></li>
        <li><NavLink to={`/menu`}>Menu</NavLink></li>
        <li><NavLink to={`/order/salad`}>Order</NavLink></li>
        {user && <li><NavLink to={`/dashboard/${isAdmin ? "adminhome" : "userHome"}`}>Dashboard</NavLink></li>}

    </>
    return (
        <div className="navbar fixed bg-opacity-40 z-30 bg-black">
            <div className="navbar-start text-white">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navoptions}
                    </ul>
                </div>
                <NavLink to={`/`} className="btn btn-ghost normal-case text-3xl">Bistro Boss</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex text-white">
                <ul className="menu menu-horizontal px-1">
                    {navoptions}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?

                    <div className='flex items-center'>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{cart?.length}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow ">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{cart?.length || 0} Items</span>
                                    <span className="text-info">Subtotal: ${totalPrice || 0}</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block" onClick={() => navigate(`/dashboard/mycart`)}>View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                                <div className="w-10 rounded-full ">
                                    <img src={user.photoURL || img} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                <li>
                                    <NavLink to={`/profile`} className="justify-between">
                                        Profile
                                        <span className="badge">{user.displayName || user.email}</span>
                                    </NavLink>
                                </li>
                                <li><NavLink to={`/settings`}>Settings</NavLink></li>
                                <li><p onClick={() => {
                                    logout()
                                }}>Logout</p></li>
                            </ul>
                        </div>

                    </div>
                    :
                    <button className="btn btn-info" onClick={() => navigate(`/login`)}>Login</button>

                }
            </div>

        </div>
    )
}
