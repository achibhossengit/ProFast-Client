import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch active + deactive riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "active-deactive"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });


  // Mutation to change status
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/riders/${id}?status=${status}`),
    onSuccess: () => {
      toast.success("Rider status updated!");
      queryClient.invalidateQueries(["riders", "active-deactive"]);
    },
    onError: () => {
      toast.error("Failed to update rider status.");
    },
  });

  if (isLoading) return <p className="text-center">Loading riders...</p>;

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
                  value={rider.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    statusMutation.mutate({ id: rider._id, status: newStatus });
                  }}
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
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
              <strong>Bike:</strong> {selectedRider.bike_brand} (
              {selectedRider.bike_regi})
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

export default ActiveRiders;
