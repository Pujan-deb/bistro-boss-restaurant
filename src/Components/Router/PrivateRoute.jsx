import { useContext } from "react"
import { Authinfo } from "../../Context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import loadingpic from '../../assets/others/cupcake.gif'
export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(Authinfo)
    const Location = useLocation()
    if (loading) {
        return <img src={loadingpic} alt="" className="mx-auto" />
    }
    if (user) {
        return children;
    }
    return <Navigate to={`/login`} state={{ from: Location }} replace></Navigate>
}
