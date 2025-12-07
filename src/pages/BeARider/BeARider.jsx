import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import riderImg from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { WarehouseContext } from "../../contexts/WarehouseContext";

const BeARider = () => {
  const { user } = useAuth();
  const {
    getRegions,
    getDistrictsByRegion,
    getCitiesByDistrict,
    getAreasByCity,
  } = useContext(WarehouseContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [hasExistingApplication, setHasExistingApplication] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const selectedRegion = watch("region");
  const selectedDistrict = watch("district");
  const selectedCity = watch("city");

  const { data: existingApplication, refetch } = useQuery({
    queryKey: ["riderApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`riders/applications/${user?.email}`);
      const data = res?.data;
      setHasExistingApplication(data && Object.keys(data).length > 0);
      return data;
    },
  });

  // Create Application Mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const submissionData = { ...data, status: "pending" };
      const res = await axiosSecure.post("riders/applications", submissionData);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Your Application Submitted Successfully!");
    },
    onError: () => toast.error("Submission Failed! Try again later."),
  });

  // Update Application Mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(
        `riders/applications/${user?.email}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
      setIsEditing(false);
      toast.success("Application Updated Successfully!");
    },
    onError: () => toast.error("Update Failed. Try again later!"),
  });

  // Delete Application Mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(
        `riders/applications/${user?.email}`
      );
      return res.data;
    },
    onSuccess: () => {
      reset();
      setHasExistingApplication(false);
      toast.success("Your application has been deleted successfully!");
    },
    onError: () => toast.error("Delete Failed!"),
  });

  const handleResetForm = useCallback(() => {
    if (existingApplication) {
      reset({
        name: existingApplication.name,
        email: existingApplication.email,
        age: existingApplication.age,
        region: existingApplication.region,
        nid: existingApplication.nid,
        contact: existingApplication.contact,
        bike_brand: existingApplication.bike_brand,
        bike_regi: existingApplication.bike_regi,
        district: existingApplication.district,
        city: existingApplication.city,
      });
    }
  }, [existingApplication, reset]);

  // Populate form with existing data
  useEffect(() => {
    handleResetForm();
  }, [handleResetForm, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete your rider application? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    handleResetForm();
  };

  const isFormDisabled = hasExistingApplication && !isEditing;
  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

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
        {hasExistingApplication
          ? "Your rider application details"
          : "Join our fast-growing delivery network and start earning while you ride!"}
      </p>

      <div className="divider"></div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-5 items-end justify-between mt-6">
        {/* Form */}
        <div>
          <fieldset
            disabled={isFormDisabled}
            className="flex-1 space-y-4 w-full"
          >
            <h3 className="text-2xl font-semibold mb-3">
              {hasExistingApplication
                ? isEditing
                  ? "Update your information"
                  : "Your Information"
                : "Tell us about yourself"}
            </h3>

            {/* Name & Email info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  disabled
                />
              </div>
            </div>

            {/* Region and District info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Region</label>
                <select
                  {...register("region", { required: "Region is required" })}
                  onChange={(e) => {
                    const newRegion = e.target.value;
                    setValue("region", newRegion);
                    resetField("district", { defaultValue: "" });
                    resetField("city", { defaultValue: "" });
                    resetField("area", { defaultValue: "" });
                  }}
                  className="select select-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                >
                  <option value="">Select Region</option>
                  {getRegions().map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <span className="text-red-500 text-sm">
                    {errors.region.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label font-medium">Warehouse District</label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  onChange={(e) => {
                    const newDistrict = e.target.value;
                    setValue("district", newDistrict);
                    resetField("city", { defaultValue: "" });
                    resetField("area", { defaultValue: "" });
                  }}
                  className="select select-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                >
                  <option value="">Select District</option>
                  {getDistrictsByRegion(selectedRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500 text-sm">
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>

            {/* City & Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Warehouse City</label>
                <select
                  {...register("city", { required: "City is required" })}
                  onChange={(e) => {
                    const newCity = e.target.value;
                    setValue("city", newCity);
                    resetField("area", { defaultValue: "" });
                  }}
                  className="select select-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                >
                  <option value="">Select City</option>
                  {getCitiesByDistrict(selectedDistrict).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label font-medium">Warehouse Area</label>
                <select
                  {...register("area", { required: "Area is required" })}
                  className="select select-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                >
                  <option value="">Select Area</option>
                  {getAreasByCity(selectedCity).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <span className="text-red-500 text-sm">
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>

            {/* NID & Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">NID Number</label>
                <input
                  type="text"
                  {...register("nid", { required: "NID is required" })}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  placeholder="Enter your NID number"
                />
                {errors.nid && (
                  <span className="text-red-500 text-sm">
                    {errors.nid.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label font-medium">Contact</label>
                <input
                  type="text"
                  {...register("contact", { required: "Contact is required" })}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  placeholder="Enter your phone number"
                />
                {errors.contact && (
                  <span className="text-red-500 text-sm">
                    {errors.contact.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bike Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Bike Brand</label>
                <input
                  type="text"
                  {...register("bike_brand", {
                    required: "Bike brand is required",
                  })}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  placeholder="Enter your Bike Brand Name"
                />
                {errors.bike_brand && (
                  <span className="text-red-500 text-sm">
                    {errors.bike_brand.message}
                  </span>
                )}
              </div>

              <div>
                <label className="label font-medium">Bike Regi. No</label>
                <input
                  type="text"
                  {...register("bike_regi", {
                    required: "Bike registration is required",
                  })}
                  className="input input-bordered w-full disabled:border disabled:border-gray-400 disabled:bg-gray-50"
                  placeholder="Bike Registration Number"
                />
                {errors.bike_regi && (
                  <span className="text-red-500 text-sm">
                    {errors.bike_regi.message}
                  </span>
                )}
              </div>
            </div>
          </fieldset>
          {/* Buttons */}
          <div className="my-4">
            {hasExistingApplication ? (
              isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-success flex-1"
                    disabled={isSubmitting}
                  >
                    {updateMutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </>
                    ) : (
                      "Confirm Update"
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn-outline flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary flex-1"
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-error flex-1"
                    disabled={isSubmitting}
                  >
                    {deleteMutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {createMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            )}
          </div>
        </div>

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
