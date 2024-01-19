import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Home/Shared/Header'
import Footer from '../Home/Shared/Footer'

export default function MainLayouts() {
    const location = useLocation()
    const noheader = location?.pathname.includes("login") || location?.pathname.includes("registration")

    return (
        <div>
            {noheader || <Header></Header>}
            <Outlet></Outlet>
            {noheader || <Footer></Footer>}
        </div>
    )
}
