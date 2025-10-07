import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const UpdateParcelModal = ({ parcel, onClose, onUpdated }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: parcel,
  });
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosSecure.put(`parcels/${parcel._id}`, data);
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="updateParcel" className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">Update Parcel</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="text"
            {...register("parcel_name")}
            className="input input-bordered w-full"
            placeholder="Parcel Name"
          />
          <input
            type="text"
            {...register("parcel_weight")}
            className="input input-bordered w-full"
            placeholder="Parcel Weight"
          />
          <input
            type="text"
            {...register("receiver_name")}
            className="input input-bordered w-full"
            placeholder="Receiver Name"
          />
          <input
            type="text"
            {...register("receiver_contact")}
            className="input input-bordered w-full"
            placeholder="Receiver Contact"
          />

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateParcelModal;
