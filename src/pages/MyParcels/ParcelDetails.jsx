import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ParcelDetails = ({ id, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${id}`);
      return res.data;
    },
  });

  return (
    <dialog id="parcelDetails" className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Parcel Details</h3>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(parcel).map(([key, value]) => (
              <p key={key}>
                <span className="font-semibold capitalize">{key}:</span>{" "}
                {String(value)}
              </p>
            ))}
          </div>
        )}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ParcelDetails;
