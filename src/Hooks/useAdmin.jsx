import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useAdmin = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: isAdmin = [], refetch, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/admin/${user?.email}`)

            return response.data.admin;

        },
    })
    return [isAdmin, refetch, isAdminLoading]
}
export default useAdmin;