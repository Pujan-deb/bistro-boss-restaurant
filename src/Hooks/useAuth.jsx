import { useContext } from "react"
import { Authinfo } from "../Context/AuthProvider"

const useAuth = () => {
    const auth = useContext(Authinfo)
    return auth
}
export default useAuth;