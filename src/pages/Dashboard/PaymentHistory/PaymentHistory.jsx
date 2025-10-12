import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch user's payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["user-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("payments");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Parcel ID</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(payment.createdAt).toLocaleString("en-US")}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.currency.toUpperCase()}</td>
                  <td>{payment.status}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.parcelId}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
