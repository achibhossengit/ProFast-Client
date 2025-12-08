import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// eslint-disable-next-line
import { motion } from "framer-motion";
import {
  MdInventory,
  MdLocalShipping,
  MdDoneAll,
  MdOutlineMoveUp,
  MdOutlineDownloadDone,
} from "react-icons/md";

const TrackParcel = () => {
  const { id } = useParams();
  const [parcelId, setParcelId] = useState(id || "");
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch parcel info
  const fetchParcelStatus = async (searchId) => {
    if (!searchId) return;
    try {
      setLoading(true);
      setError("");
      setParcel(null);

      const res = await axiosSecure.get(`/parcels/${searchId}`);
      setParcel(res.data);
    } catch (err) {
      console.log(err);
      setError("No parcel found with this ID.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!parcelId.trim()) return setError("Please enter a valid tracking ID.");

    // Update URL
    navigate(`/dashboard/track-parcel/${parcelId}`, { replace: true });

    // Fetch parcel
    fetchParcelStatus(parcelId);
  };

  // Auto fetch if parcel id in URL
  useEffect(() => {
    if (id) {
      setParcelId(id);
      fetchParcelStatus(id);
    }
  }, [id]);

  // Status flow
  const statusSteps = [
    { id: "pending", label: "Pending", icon: <MdInventory size={30} /> },
    {
      id: "collecting",
      label: "Collecting",
      icon: <MdOutlineMoveUp size={30} />,
    },
    {
      id: "collected",
      label: "Collected",
      icon: <MdOutlineDownloadDone size={30} />,
    },
    {
      id: "sendWarehouse",
      label: "In Warehouse",
      icon: <MdOutlineDownloadDone size={30} />,
    },
    {
      id: "delivering",
      label: "Delevering",
      icon: <MdLocalShipping size={30} />,
    },
    { id: "delivered", label: "Delivered", icon: <MdDoneAll size={30} /> },
  ];

  const currentStep = statusSteps.findIndex(
    (step) => step.id === parcel?.delivery_status
  );

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3 text-center">
        Track Your Parcel
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 mb-4 justify-center items-center"
      >
        <input
          type="text"
          name="parcelId"
          value={parcelId}
          onChange={(e) => setParcelId(e.target.value)}
          placeholder="Enter Parcel ID"
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn btn-primary btn-outline"
          disabled={loading}
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {parcel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border p-4 rounded-md shadow-sm mt-4"
        >
          <p>
            <span className="font-semibold">Parcel Name:</span>{" "}
            {parcel.parcel_name}
          </p>
          <p>
            <span className="font-semibold">Delivery Status:</span>{" "}
            <span className="text-primary">{parcel.delivery_status}</span>
          </p>

          {/* Tracking Progress */}
          <div className="mt-8 relative">
            <div className="absolute top-[26px] left-0 w-full h-[3px] bg-gray-300 -z-10"></div>
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStep;
                return (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${
                        isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-200 text-gray-400 border-gray-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.icon}
                    </motion.div>
                    <p
                      className={`text-sm mt-2 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Animated Progress Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8 }}
              className="absolute top-[26px] left-0 h-[3px] bg-primary -z-0"
            ></motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrackParcel;
