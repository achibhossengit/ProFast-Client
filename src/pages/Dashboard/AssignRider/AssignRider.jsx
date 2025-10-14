import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ParcelDetailsModal from "./ParcelDetailsModal";
import AssignRiderModal from "./AssignRiderModal";
import { useQuery } from "@tanstack/react-query";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [assignParcel, setAssignParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: { delivery_status: "not-collected", payment_status: "paid" },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">Assign Rider</h2>

      {parcels.length === 0 ? (
        <div className="text-center text-gray-500">No parcels found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Parcel Name</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.date}</td>
                  <td>
                    <button
                      className="link link-primary"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      {parcel.parcel_name}
                    </button>
                  </td>
                  <td>
                    {parcel.sender_region}, {parcel.sender_district},{" "}
                    {parcel.sender_area}
                  </td>
                  <td>
                    {parcel.receiver_region}, {parcel.receiver_district},{" "}
                    {parcel.receiver_area}
                  </td>
                  <td>৳{parcel.cost}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={parcel.delivery_status !== "not-collected"}
                      onClick={() => setAssignParcel(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedParcel && (
        <ParcelDetailsModal
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}

      {assignParcel && (
        <AssignRiderModal
          onClose={() => setAssignParcel(null)}
          parcel={assignParcel}
        />
      )}
    </div>
  );
};

export default AssignRider;
