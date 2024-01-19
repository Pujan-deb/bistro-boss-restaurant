import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";

export default function Dashboard() {
    const [cart] = useCart()
    const [isAdmin, isAdminLoading] = useAdmin()
    console.log(isAdmin)
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden absolute left-0 top-0"><i className="fa-solid fa-bars"></i></label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content text-[18px] space-y-3">
                        <p className="text-center text-xl font-bold uppercase">Bistroo Boss Dashboard</p>
                        {/* Sidebar content here */}
                        {isAdmin ?
                            <>
                                <li><NavLink to={`/dashboard/adminhome`}><i className="fa-solid fa-house"></i>Admin Home</NavLink></li>
                                <li><NavLink to={`/dashboard/additem`}><i className="fa-solid fa-spoon"></i> Add items</NavLink></li>
                                <li><NavLink to={`/dashboard/Manageitems`}><i className="fa-solid fa-bars"></i> Manage items </NavLink></li>
                                <li><NavLink to={`/`}><i className="fa-solid fa-book"></i> Manage Bookings</NavLink></li>
                                <li><NavLink to={`/dashboard/allusers`}><i className="fa-solid fa-users"></i> All users</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to={`/dashboard/UserHome`}><i className="fa-solid fa-house"></i>User Home</NavLink></li>
                                <li><NavLink to={`/`}><i className="fa-solid fa-calendar-days"></i> Reservation</NavLink></li>
                                <li><NavLink to={`/dashboard/mycart`}><i className="fa-solid fa-cart-shopping"></i> MyCart <span className="badge badge-sm indicator-item">{cart?.length || 0}</span></NavLink></li>
                                <li><NavLink to={`/dashboard/paymenthistory`}><i className="fa-solid fa-wallet"></i> Payment history</NavLink></li>
                            </>}

                        <div className="divider divider-info"></div>
                        <li><NavLink to={`/`}><i className="fa-solid fa-house"></i> Home</NavLink></li>
                        <li><NavLink to={`/`}><i className="fa-solid fa-bars"></i> Menu</NavLink></li>
                        <li><NavLink to={`/order/salad`}><i className="fa-brands fa-shopify"></i> Shop</NavLink></li>
                        <li><NavLink to={`/`}><i className="fa-solid fa-address-book"></i> Contact</NavLink></li>

                    </ul>

                </div>
            </div>
        </div>
    )
}
