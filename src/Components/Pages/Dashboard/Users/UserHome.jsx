import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Home/Shared/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";

export default function UserHome() {
    const { user } = useAuth()
    return (
        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>User home</title>
            </Helmet>
            <SectionTitle subheading={`Bistroo Boss`} heading={`Home`}></SectionTitle>
            <div className="text-center">
                <h2>Hi {user?.displayName}, Welcome back</h2>

            </div>
        </div>
    )
}
