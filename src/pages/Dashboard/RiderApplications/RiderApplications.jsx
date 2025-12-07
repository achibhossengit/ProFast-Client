import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const RiderApplications = () => {
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/applications");
      return res.data;
    },
  });

  // Accept Mutation
  const acceptRejectMutation = useMutation({
    mutationFn: async ({ email, accepted = true }) => {
      const res = await axiosSecure.patch(
        `/riders/applications/${email}/${accepted}`
      );
      return res.data;
    },

    onSuccess: (data, variables) => {
      setSelectedRider(null);
      queryClient.invalidateQueries(["riders"]);

      if (variables.accepted) {
        toast.success("Rider accepted successfully!");
      } else {
        toast.success("Rider rejected successfully!");
      }
    },

    onError: (error, variables) => {
      if (variables.accepted) {
        toast.error("Failed to accept rider. Please try again.");
      } else {
        toast.error("Failed to reject rider. Please try again.");
      }
    },
  });

  const handleAccept = () => {
    acceptRejectMutation.mutate({ email: selectedRider.email, accepted: true });
  };

  const handleReject = () => {
    acceptRejectMutation.mutate({
      email: selectedRider.email,
      accepted: false,
    });
  };

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
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rider Details Modal */}
      {selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="font-bold text-xl">{selectedRider.name}</h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setSelectedRider(null)}
              >
                <MdClose />
              </button>
            </div>

            {/* Rider Details */}
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
                  <strong>Warehouse:</strong> {selectedRider.warehouse_district}
                  , {selectedRider.warehouse_city}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="modal-action mt-6 flex justify-between">
              <button
                onClick={handleReject}
                disabled={acceptRejectMutation.isPending}
                className="btn btn-outline btn-error w-24"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                disabled={acceptRejectMutation.isPending}
                className="btn btn-primary w-24"
              >
                Accept
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RiderApplications;
