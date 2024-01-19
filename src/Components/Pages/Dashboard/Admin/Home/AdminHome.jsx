import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../../../Hooks/useAuth"
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure"
import moment from "moment/moment"

export default function AdminHome() {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: stats, refetch, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats")
            return res.data
        }
    })
    const date = new Date()


    return (
        <div className="w-4/5 mx-auto">
            <h2 className="font-bold text-xl uppercase">hi {user?.displayName || "user"}, welcome back</h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full" >

                <div className="stat">
                    <div className="stat-title">reenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - {moment().format("Do MMM")}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="stat-desc">jan 1st - {moment().format("Do MMM")}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">{stats?.alluser}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Food items</div>
                    <div className="stat-value">{stats?.foodtems}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>

        </div>
    )
}
