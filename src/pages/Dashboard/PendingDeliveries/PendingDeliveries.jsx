import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pendingDeliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("rider/parcels");
      return res.data;
    },
  });

  if (isPending) return <LoadingSpinner />;

  // ✅ Function to handle status update
  const handleStatusUpdate = async (parcelId, newStatus) => {
    try {
      await axiosSecure.patch(`/rider/parcels/${parcelId}`, {
        delivery_status: newStatus,
      });
      refetch();
    } catch (error) {
      console.error(error);
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">📦 Pending Deliveries</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500 text-center">
          No pending deliveries found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Parcel Name</th>
                <th>Receiver</th>
                <th>Receiver Contact</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <td>{idx + 1}</td>
                  <td>{parcel.parcel_name}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.receiver_contact}</td>
                  <td>{parcel.sender_district}</td>
                  <td>{parcel.receiver_district}</td>
                  <td>{parcel.cost}৳</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        parcel.delivery_status === "way_to_collect"
                          ? "bg-yellow-100 text-yellow-700"
                          : parcel.delivery_status === "in_transit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {parcel.delivery_status.replace(/_/g, " ")}
                    </span>
                  </td>

                  {/* Action Column */}
                  <td>
                    {parcel.delivery_status === "way-to-collect" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "in_transit")
                        }
                        className="btn btn-warning btn-xs"
                      >
                        Mark as In Transit
                      </button>
                    )}

                    {parcel.delivery_status === "in-transit" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "delivered")
                        }
                        className="btn btn-success btn-xs"
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {parcel.delivery_status === "delivered" && (
                      <span className="text-green-600 font-medium">
                        ✅ Delivered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
