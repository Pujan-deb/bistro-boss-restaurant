import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect } from "react"
import { useState } from "react"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure"
import useAuth from "../../../../Hooks/useAuth"
import useCart from "../../../../Hooks/useCart"
import Swal from "sweetalert2"
import moment from "moment"


export default function CheckoutForm() {
    const stripe = useStripe()
    const element = useElements()
    const { user } = useAuth()
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const price = parseFloat(totalPrice)
    const [error, setError] = useState("")
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState("")
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState("")

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [price, axiosSecure])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !element) {
            return
        }
        const card = element.getElement(CardElement)
        if (card === null) {
            return
        }
        console.log("card data", card)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            setError("")
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true)
        stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymus",
                        email: user?.email
                    },
                },
            })
            .then(function (result) {
                // Handle result.error or result.paymentIntent
                const { error, paymentIntent } = result
                if (error) {
                    console.log(error)
                } else {
                    console.log(paymentIntent)
                    setProcessing(false)
                    setTransactionId(paymentIntent.id)
                    if (paymentIntent.status === "succeeded") {
                        const payment = {
                            email: user?.email,
                            transactionId: paymentIntent.id,
                            price,
                            date: moment().format("MMM Do YYYY, h:mm:ss a"),
                            status: "pending",
                            number_of_item: cart.length,
                            Cartitems: cart.map(items => items._id),
                            Menuitems: cart.map(items => items.itemID),
                            itemsName: cart.map(items => items.name)
                        }
                        axiosSecure.post("/payment", { payment })
                            .then(res => {
                                console.log(res)
                                Swal.fire({
                                    title: "Congratulation!",
                                    text: "Thanks for the payment.",
                                    icon: "success"
                                });
                                refetch()
                            })
                    }

                }
            });


    }
    return (
        <form onSubmit={handleSubmit} className="my-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-block btn-neutral mt-4">
                Pay
            </button>
            <h4 className="text-center text-red-600 font-semibold mt-2">{error}</h4>
            {transactionId && <h4 className="text-center text-green-500 font-semibold mt-2">Your transaction id: {transactionId}</h4>}
        </form>
    )
}
