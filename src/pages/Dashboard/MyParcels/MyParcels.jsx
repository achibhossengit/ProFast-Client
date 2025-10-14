import { useQuery } from "@tanstack/react-query";
import ParcelsTable from "./ParcelsTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("my-parcels");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Parcels</h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <ParcelsTable parcels={parcels} />
      )}
    </div>
  );
};

export default MyParcels;
