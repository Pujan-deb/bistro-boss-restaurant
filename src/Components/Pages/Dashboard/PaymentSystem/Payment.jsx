import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Home/Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK)

export default function Payment() {

    return (
        <div className="w-4/5 mx-auto">
            <Helmet>
                <title>Bistroo Boss | Payment</title>
            </Helmet>
            <SectionTitle subheading={`Bistroo Boss`} heading={`Payment`}></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    )
}
