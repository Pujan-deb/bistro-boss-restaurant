import {
    useQuery
} from '@tanstack/react-query'
import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';


// Create a client
const useCart = () => {
    const { user, loading } = useAuth()
    // const [axiosSecure] = useAxiosSecure()
    // const token = localStorage.getItem("access-token")
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/cart?email=${user?.email}`)
            const info = response.json();
            return info
        },
        // queryFn: async () => {
        //     const response = await axiosSecure.get(`/cart?email=${user?.email}`)

        //     return response.data
        // },
    })
    return [cart, refetch]
}
export default useCart;
