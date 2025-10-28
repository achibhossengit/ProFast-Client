import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { useState } from "react";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  // ✅ Fetch delivered parcels
  const { data: deliveredParcels = [], isLoading } = useQuery({
    queryKey: ["deliveredParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels/delivered");
      return res.data;
    },
  });

  // ✅ Update single parcel cashout
  const { mutate: handleCashout } = useMutation({
    mutationFn: async (parcelId) => {
      setProcessingId(parcelId);
      const res = await axiosSecure.patch(`/rider/parcels/${parcelId}/cashout`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["deliveredParcels"]);
      setProcessingId(null);
    },
    onError: () => {
      alert("Cashout update failed!");
      setProcessingId(null);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // ✅ Calculate total earning (70%)
  const totalEarning = deliveredParcels.reduce(
    (acc, parcel) => acc + parcel.cost * 0.7,
    0
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Completed Deliveries</h2>

      {deliveredParcels.length === 0 ? (
        <p>No completed deliveries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Parcel ID</th>
                <th>Receiver</th>
                <th>Address</th>
                <th>Total (৳)</th>
                <th>Your Earn (70%)</th>
                <th>Cashout</th>
              </tr>
            </thead>
            <tbody>
              {deliveredParcels.map((parcel, idx) => (
                <tr key={parcel._id} className="hover">
                  <td>{idx + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.delivery_address}</td>
                  <td>{parcel.cost}</td>
                  <td>{(parcel.cost * 0.7).toFixed(2)}</td>

                  <td>
                    {parcel.cashout_status !== "cashed_out" ? (
                      <button
                        disabled={processingId === parcel._id}
                        onClick={() => handleCashout(parcel._id)}
                        className="btn btn-xs btn-primary"
                      >
                        {processingId === parcel._id
                          ? "Processing..."
                          : "Cash Out"}
                      </button>
                    ) : (
                      <span className="px-2 py-1 rounded bg-green-500 text-white text-sm">
                        Cashed Out
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🪙 Summary */}
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">
              Total Earnings: ৳{totalEarning.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
