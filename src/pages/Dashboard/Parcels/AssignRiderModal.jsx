import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from "../../Shared/Pagination";
import toast from "react-hot-toast";

const AssignRiderModal = ({ onClose, parcel }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const district =
    parcel.delivery_status === "pending"
      ? parcel.sender_district
      : parcel.receiver_district;

  // pagination
  const [totalDataCount, setTotalDataCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", district, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          role: "rider",
          district: district,
          page: currentPage,
          limit: limit,
        },
      });

      const data = res.data;
      const { totalPages, total } = data.pagination || {};

      setTotalPages(totalPages || 1);
      setTotalDataCount(total || 0);

      return data.users || [];
    },
  });

  // Assign rider
  const [assigning, setAssigning] = useState(false);

  const handleAssign = async (rider_email) => {
    try {
      setAssigning(true);
      await axiosSecure.patch(`/parcels/${parcel._id}/assign/${rider_email}`);

      toast.success("Rider assigned successfully!");

      // Close modal
      onClose();

      // Refresh parcel list
      queryClient.invalidateQueries(["parcels"]);
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
            Assign Rider for: {parcel.parcel_name}
          </h3>

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
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <span className="loading loading-spinner loading-lg"></span>
                    </td>
                  </tr>
                ) : riders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No available riders found in <strong>"{district}"</strong>{" "}
                      district.
                    </td>
                  </tr>
                ) : (
                  riders.map((rider, idx) => (
                    <tr key={rider.email}>
                      <td>{(currentPage - 1) * limit + (idx + 1)}</td>
                      <td>{rider.name || "N/A"}</td>
                      <td>{rider.email}</td>
                      <td>{rider.contact || "N/A"}</td>
                      <td>{rider.details.district || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          disabled={
                            rider.details.status !== "active" || assigning
                          }
                          onClick={() => handleAssign(rider.email)}
                        >
                          {assigning ? "Assigning..." : "Assign"}
                        </button>
                      </td>
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
