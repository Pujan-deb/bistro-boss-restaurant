import usePayment from "../../../../Hooks/usePayment";
import SectionTitle from "../../../Home/Shared/SectionTitle";

export default function Paymenthistory() {
    const [payment] = usePayment()
    console.log(payment)
    return (
        <div className="w-4/5 mx-auto">
            <SectionTitle subheading={`Bistroo Boss`} heading={`Payment history`}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white font-semibold text-xs">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>TransactionID</th>
                                <th>Amount</th>
                                <th>status</th>
                                <th>date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {payment.map((item, index) =>
                                <tr key={item._id} className="font-semibold">
                                    <th>{index + 1}</th>
                                    <td>{item.email}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                    <td>{item.date}</td>

                                </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
