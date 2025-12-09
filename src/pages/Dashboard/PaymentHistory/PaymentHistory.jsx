import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Pagination from "../../Shared/Pagination";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch payments with pagination
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("payments", {
        params: { page: currentPage, limit },
      });
      console.log(res);
      const data = res.data;
      const { total, totalPages } = data.pagination;
      setTotalDataCount(total);
      setTotalPages(totalPages || 1);
      return res.data.data;
    },
  });

  return (
    <div className="min-h-[70vh]">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full table-zebra">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Parcel ID</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-gray-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>
                    {new Date(payment.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {payment.amount} {payment.currency?.toUpperCase()}
                  </td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.parcelId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={totalPages}
        totalDataCount={totalDataCount}
      />
    </div>
  );
};

export default PaymentHistory;
