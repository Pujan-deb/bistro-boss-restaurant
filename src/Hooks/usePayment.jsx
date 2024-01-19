import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const usePayment = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: payment = [], refetch, isLoading: isPaymentLoading } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/payment?email=${user.email}`)

            return response.data;

        },
    })
    return [payment, refetch, isPaymentLoading]
}
export default usePayment;