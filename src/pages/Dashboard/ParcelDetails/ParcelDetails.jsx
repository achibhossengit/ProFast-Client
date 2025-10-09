import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { FaBox, FaTrash, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import ParcelForm from "../Shared/ParcelForm";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();

  const { data: parcel } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (parcel) {
      reset(parcel);
    }
  }, [parcel]);

  const updateMutation = useMutation({
    mutationFn: (updatedData) => {
      console.log(updatedData);
      return axiosSecure.put(`/parcels/${id}`, updatedData);
    },
    onSuccess: () => {
      toast.success("Updated Successfully.");
      setIsEditMode(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Update Faild. Try again!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axiosSecure.delete(`/parcels/${id}`);
    },
    onSuccess: () => {
      toast.success(`${parcel.parcel_name} is deleted successfully!`);
      navigate("/dashboard/my-parcels");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Parcel delation is failed. Try again later.");
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return String(value);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.log(error);
      return String(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateMutation.mutate)}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaBox />
          Parcel Details
        </h1>

        {!isEditMode ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditMode(true);
              }}
              className="btn btn-outline btn-sm gap-2"
            >
              <FaEdit />
              Edit Parcel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-error btn-sm gap-2"
            >
              <FaTrash />
              Delete
              {/* {deleteMutation.isPending ? "Deleting..." : "Delete"} */}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm gap-2"
              disabled={updateMutation.isPending}
              type="submit"
            >
              <FaSave />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="btn btn-outline btn-sm gap-2"
              disabled={updateMutation.isPending}
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="divider"></div>

      <div>
        <ParcelForm
          register={register}
          watch={watch}
          disable={!isEditMode}
        ></ParcelForm>
        <div className="divider"></div>

        {/* Status Information */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Status & Tracking</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Delivery Status</label>
              <div className="p-3 bg-base-200 rounded-lg opacity-60">
                <p className="font-semibold">
                  {parcel?.delivery_status || "N/A"}
                </p>
              </div>
            </div>

            <div className="form-control">
              <label className="label">Payment Status</label>
              <div className="p-3 bg-base-200 rounded-lg opacity-60">
                <p className="font-semibold">
                  {parcel?.payment_status || "N/A"}
                </p>
              </div>
            </div>

            <div className="form-control">
              <label className="label">Created By</label>
              <div className="p-3 bg-base-200 rounded-lg opacity-60">
                <p className="font-semibold">{parcel?.created_by || "N/A"}</p>
              </div>
            </div>

            <div className="form-control">
              <label className="label">Created At</label>
              <div className="p-3 bg-base-200 rounded-lg opacity-60">
                <p className="font-semibold">
                  {formatDateTime(parcel?.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ParcelDetails;
