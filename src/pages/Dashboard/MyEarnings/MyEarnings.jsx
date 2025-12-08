import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["riderEarnings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/my-earnings");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const {
    total_collected_parcel,
    total_delivered_parcel,
    collected_parcel_earning,
    delivered_parcel_earning,
    total_earning,
  } = data || {};

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">💰 My Earnings</h2>

      <div className="space-y-4">
        <div className="flex justify-between bg-gray-100 p-3 rounded">
          <span>Total Collected Parcels:</span>
          <span className="font-semibold">{total_collected_parcel}</span>
        </div>

        <div className="flex justify-between bg-gray-100 p-3 rounded">
          <span>Total Delivered Parcels:</span>
          <span className="font-semibold">{total_delivered_parcel}</span>
        </div>

        <div className="flex justify-between bg-blue-100 p-3 rounded">
          <span>Collected Parcel Earnings:</span>
          <span className="font-semibold text-blue-700">
            ৳{collected_parcel_earning.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between bg-green-100 p-3 rounded">
          <span>Delivered Parcel Earnings:</span>
          <span className="font-semibold text-green-700">
            ৳{delivered_parcel_earning.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between bg-yellow-100 p-3 rounded">
          <span>Total Earnings:</span>
          <span className="font-semibold text-yellow-700">
            ৳{total_earning.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyEarnings;
