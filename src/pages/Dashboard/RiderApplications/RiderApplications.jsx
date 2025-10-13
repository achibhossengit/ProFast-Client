import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RiderApplications = () => {
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=pending");
      return res.data;
    },
  });

  // Accept Mutation
  const acceptMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/riders/${id}?status=active`),
    onSuccess: () => {
      toast.success("Rider accepted successfully!");
      queryClient.invalidateQueries(["riders"]);
    },
    onError: () => {
      toast.error("Failed to accept rider. Please try again.");
    },
  });

  // Reject Mutation
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/riders/${id}`),
    onSuccess: () => {
      toast.success("Rider application rejected.");
      queryClient.invalidateQueries(["riders"]);
    },
    onError: () => {
      toast.error("Failed to reject rider. Please try again.");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Rider</th>
            <th>Region</th>
            <th>Contact</th>
            <th>Warehouse</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="text-blue-600 hover:underline flex items-center gap-1"
                  onClick={() => setSelectedRider(rider)}
                >
                  {rider.name} <FaEye />
                </button>
              </td>
              <td>{rider.region}</td>
              <td>{rider.contact}</td>
              <td>
                {rider.warehouse_district}, {rider.warehouse_city}
              </td>
              <td>
                <select
                  className="select select-bordered select-sm"
                  defaultValue="pending"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "accept") acceptMutation.mutate(rider._id);
                    if (value === "reject") rejectMutation.mutate(rider._id);
                  }}
                >
                  <option disabled value="pending">
                    Pending
                  </option>
                  <option value="accept">Accept</option>
                  <option value="reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{selectedRider.name}</h3>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Age:</strong> {selectedRider.age}
            </p>
            <p>
              <strong>Region:</strong> {selectedRider.region}
            </p>
            <p>
              <strong>Contact:</strong> {selectedRider.contact}
            </p>
            <p>
              <strong>NID:</strong> {selectedRider.nid}
            </p>
            <p>
              <strong>Bike Brand:</strong> {selectedRider.bike_brand}
            </p>
            <p>
              <strong>Bike Registration:</strong> {selectedRider.bike_regi}
            </p>
            <p>
              <strong>Warehouse:</strong> {selectedRider.warehouse_district},{" "}
              {selectedRider.warehouse_city}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RiderApplications;
