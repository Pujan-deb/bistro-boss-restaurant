
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";

export default function AdminRoutes({ children }) {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const Location = useLocation()
    if (loading && isAdminLoading) {
        return <span className="loading loading-spinner text-primary"></span>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={`/`} state={{ from: Location }} replace></Navigate>
}
