import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveredParcels = [], isLoading } = useQuery({
    queryKey: ["deliveredParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels/delivered");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // ✅ Calculate earnings
  const totalEarnings = deliveredParcels.reduce(
    (acc, parcel) => acc + parcel.cost * 0.7,
    0
  );

  const cashedOutEarnings = deliveredParcels
    .filter((p) => p.cashout_status === "cashed_out")
    .reduce((acc, p) => acc + p.cost * 0.7, 0);

  const pendingEarnings = deliveredParcels
    .filter((p) => !p.cashout_status || p.cashout_status === "pending")
    .reduce((acc, p) => acc + p.cost * 0.7, 0);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">💰 My Earnings</h2>

      <div className="space-y-4">
        <div className="flex justify-between bg-gray-100 p-3 rounded">
          <span>Total Earnings:</span>
          <span className="font-semibold">৳{totalEarnings.toFixed(2)}</span>
        </div>

        <div className="flex justify-between bg-green-100 p-3 rounded">
          <span>Cashed Out Earnings:</span>
          <span className="font-semibold text-green-700">
            ৳{cashedOutEarnings.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between bg-yellow-100 p-3 rounded">
          <span>Pending Earnings:</span>
          <span className="font-semibold text-yellow-700">
            ৳{pendingEarnings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
