import { useState } from "react";
import warehouses from "../../assets/warehouses.json";
import useAuth from "../../hooks/useAuth";
// eslint-disable-next-line
import { motion } from "framer-motion";
import riderImg from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const BeARider = () => {
  const { user } = useAuth();
  const [district, setDistrict] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const uniqueDistricts = [...new Set(warehouses.map((item) => item.district))];

  // When district changes
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    const found = warehouses.find((w) => w.district === selectedDistrict);
    if (found) {
      setAvailableCities([found.city, ...found.covered_area]);
    } else {
      setAvailableCities([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.status = "pending";

    axiosSecure
      .post("riders", data)
      .then(() => {
        e.target.reset();

        Swal.fire({
          title: "Application Sent Successfully!",
          text: "You will get notified by email within 24 workhours. Redirect to the dashboard.",
          icon: "success",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard");
          }
        });
      })
      .catch((error) => {
        console.error("Submission failed:", error);
        Swal.fire({
          title: "Submission Failed",
          text: error.response?.data?.message || 'Internal Server Error',
          icon: "error",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        });
      });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-2"
      >
        Be a Rider
      </motion.h2>
      <p className="text-gray-600 mb-6">
        Join our fast-growing delivery network and start earning while you ride!
      </p>

      <div className="divider"></div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-5 items-end justify-between mt-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
          <h3 className="text-2xl font-semibold mb-3">
            Tell us about yourself
          </h3>

          {/* Name & Email info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="label font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                defaultValue={user?.displayName || ""}
                readOnly
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                defaultValue={user?.email || ""}
                readOnly
              />
            </div>
          </div>

          {/* Age & Region info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="label font-medium">Age</label>
              <input
                type="number"
                name="age"
                className="input input-bordered w-full"
                placeholder="Enter your age"
                required
              />
            </div>

            {/* Region */}
            <div>
              <label className="label font-medium">Region</label>
              <select
                name="region"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Region</option>
                {[...new Set(warehouses.map((w) => w.region))].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* NID & Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">NID Number</label>
              <input
                type="text"
                name="nid"
                className="input input-bordered w-full"
                placeholder="Enter your NID number"
                required
              />
            </div>

            <div>
              <label className="label font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                className="input input-bordered w-full"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          {/* Bike Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Bike Brand</label>
              <input
                type="text"
                name="bike_brand"
                className="input input-bordered w-full"
                placeholder="Enter your Bike Brand Name"
                required
              />
            </div>

            <div>
              <label className="label font-medium">Bike Regi. No</label>
              <input
                type="text"
                name="bike_regi"
                className="input input-bordered w-full"
                placeholder="Bike Registration Number"
                required
              />
            </div>
          </div>

          {/* Warehouse info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">Warehouse District</label>
              <select
                name="warehouse_district"
                className="select select-bordered w-full"
                value={district}
                onChange={handleDistrictChange}
                required
              >
                <option value="">Select District</option>
                {uniqueDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label font-medium">Warehouse City</label>
              <select
                name="warehouse_city"
                className="select select-bordered w-full"
                disabled={!availableCities.length}
                required
              >
                <option value="">Select City</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit Application
          </button>
        </form>

        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={riderImg} alt="Be a Rider" className="w-full max-w-sm" />
        </motion.div>
      </div>
    </div>
  );
};

export default BeARider;
