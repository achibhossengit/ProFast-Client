import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ParcelsTable from "./ParcelsTable";
import Swal from "sweetalert2";
import ParcelDetails from "./ParcelDetails";
import UpdateParcelModal from "./UpdateParcelModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcelId, setSelectedParcelId] = useState(null);
  const [updateParcel, setUpdateParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`parcels/${id}`);
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          refetch();
        } catch(error) {
          console.log(error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  const handleUpdate = (parcel) => {
    setUpdateParcel(parcel);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Parcels</h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <ParcelsTable
          parcels={parcels}
          refetch={refetch}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onDetails={(id) => setSelectedParcelId(id)}
        />
      )}

      {/* Details Modal */}
      {selectedParcelId && (
        <ParcelDetails
          id={selectedParcelId}
          onClose={() => setSelectedParcelId(null)}
        />
      )}

      {/* Update Modal */}
      {updateParcel && (
        <UpdateParcelModal
          parcel={updateParcel}
          onClose={() => setUpdateParcel(null)}
          onUpdated={refetch}
        />
      )}
    </div>
  );
};

export default MyParcels;
