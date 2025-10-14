import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssignRiderModal = ({ onClose, parcel }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [assigning, setAssigning] = useState(false);

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["availableRiders", parcel?._id],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/available", {
        params: { warehouse_district: parcel.sender_district },
      });
      return res.data;
    },
    enabled: !!parcel,
  });

  console.log(parcel.sender_district);

  // Assign rider
  const handleAssign = async (rider) => {
    try {
      setAssigning(true);
      await axiosSecure.put(`/parcels/${parcel._id}/assign`, rider);
      toast.success("Rider assigned successfully!");
      onClose(); // close modal
      queryClient.invalidateQueries(["parcels"]); // refresh parcel list
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to assign rider!");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
          <h3 className="text-xl font-semibold mb-4">
            Assign Rider for Parcel: {parcel.parcel_name}
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : riders.length === 0 ? (
            <p className="text-center text-gray-500">
              No available riders found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, idx) => (
                    <tr key={rider._id}>
                      <td>{idx + 1}</td>
                      <td>{rider.name}</td>
                      <td>{rider.email}</td>
                      <td>{rider.contact}</td>
                      <td>{rider.warehouse_district}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          disabled={assigning}
                          onClick={() => handleAssign(rider)}
                        >
                          {assigning ? "Assigning..." : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignRiderModal;
