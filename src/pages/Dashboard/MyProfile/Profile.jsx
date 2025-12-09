import { useState, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UpdateUserEmailModal from "./UpdateUserEmailModal";
import UpdatePasswordModal from "./UpdatePasswordModal";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const fileInputRef = useRef(null);

  // UI State
  const [activeMode, setActiveMode] = useState(null); // 'bio' | null
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Form State
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    age: "",
    gender: "",
    profession: "",
    contact: "",
    address: "",
  });

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    setProfilePicLoading(true);
    try {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      const uploadURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;

      const res = await axios.post(uploadURL, formData);
      const newPhotoUrl = res.data?.data?.display_url;

      if (newPhotoUrl) {
        await updateUserProfile({ photoURL: newPhotoUrl });
      }
    } catch (error) {
      console.log(error);
      toast.error("Image Upload Failed!");
    } finally {
      setProfilePicLoading(false);
    }
  };

  // Fetch user profile
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile`);
      return res.data.user;
    },
    enabled: !!user,
  });

  // Sync local state with fetched data
  useEffect(() => {
    if (userDetails) {
      setUpdatedUserDetails({
        age: userDetails.age || "",
        gender: userDetails.gender || "",
        profession: userDetails.profession || "",
        contact: userDetails.contact || "",
        address: userDetails.address || "",
      });
    }
  }, [userDetails]);

  // Sync display name with user
  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/users/profile`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["userProfile"]);
      setActiveMode(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  // Mutation for updating display name
  const updateNameMutation = useMutation({
    mutationFn: async (newName) => {
      if (!newName.trim()) {
        throw new Error("Name cannot be empty");
      }
      await updateUserProfile({ displayName: newName });
    },
    onSuccess: () => {
      toast.success("Name updated successfully!");
      setIsEditingName(false);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update name");
    },
  });

  const handleBioChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    updateProfileMutation.mutate(updatedUserDetails);
  };

  const handleCancel = () => {
    setActiveMode(null);
    // Reset bio form to original values
    if (userDetails) {
      setUpdatedUserDetails({
        age: userDetails.age || "",
        gender: userDetails.gender || "",
        profession: userDetails.profession || "",
        contact: userDetails.contact || "",
        address: userDetails.address || "",
      });
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setDisplayName(user?.displayName || "");
  };

  const handleNameUpdate = () => {
    updateNameMutation.mutate(displayName);
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setDisplayName(user?.displayName || "");
  };

  const isAnyMutationLoading =
    updateProfileMutation.isLoading || updateNameMutation.isLoading;

  return (
    <div className="py-8 px-3">
      <div className="max-w-2xl mx-auto rounded-lg border p-6">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div
            disabled={profilePicLoading}
            onClick={handleAvatarClick}
            className="avatar mb-4 hover:grayscale cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
              {profilePicLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt={user?.displayName || "User"}
                    className="rounded-full"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              )}
            </div>
          </div>

          {/* Display Name with Edit */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  className="input input-bordered input-sm max-w-xs text-center text-xl font-bold"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoFocus
                />
                <button
                  className="btn btn-xs btn-success btn-circle"
                  onClick={handleNameUpdate}
                  disabled={updateNameMutation.isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-xs btn-error btn-circle"
                  onClick={handleNameCancel}
                  disabled={updateNameMutation.isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">
                  {user?.displayName || "User"}
                </h1>
                <button
                  className="btn btn-xs btn-ghost btn-circle"
                  onClick={handleNameEdit}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Email with Edit */}
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-600">{user?.email}</p>
            <button
              className="btn btn-xs btn-ghost btn-circle"
              onClick={() => {
                // setIsEmailModalOpen(true)
                toast.error("Feature disabled for demo purposes.");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="mb-6">
          {/* Details header */}
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-semibold">User Details</h2>

            {isLoading ? (
              <span className="loading loading-dots"></span>
            ) : isError ? (
              <p className="text-error text-xs">Something went wrong!</p>
            ) : activeMode ? (
              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-outline btn-primary"
                  onClick={handleCancel}
                  disabled={isAnyMutationLoading}
                >
                  Cancel
                </button>
                {activeMode === "bio" && (
                  <button
                    className="btn btn-xs btn-success"
                    onClick={handleUpdateProfile}
                    disabled={isAnyMutationLoading}
                  >
                    {updateProfileMutation.isLoading ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <button
                  className="btn btn-xs btn-outline btn-error"
                  onClick={() => {
                    // setIsPasswordModalOpen(true);
                    toast.error("Feature disabled for demo purposes.");
                  }}
                >
                  Change Password
                </button>
                <button
                  className="btn btn-xs btn-outline btn-primary"
                  onClick={() => setActiveMode("bio")}
                >
                  Update Bio
                </button>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div>
            {activeMode === "bio" ? (
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    min="1"
                    max="120"
                    className="input input-bordered w-full"
                    value={updatedUserDetails.age}
                    onChange={handleBioChange}
                    placeholder="Enter your age"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    name="gender"
                    className="select select-bordered w-full"
                    value={updatedUserDetails.gender}
                    onChange={handleBioChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profession</span>
                  </label>
                  <input
                    type="text"
                    name="profession"
                    className="input input-bordered w-full"
                    value={updatedUserDetails.profession}
                    onChange={handleBioChange}
                    placeholder="Enter your profession"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    className="input input-bordered w-full"
                    value={updatedUserDetails.contact}
                    onChange={handleBioChange}
                    placeholder="Enter your contact number"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <textarea
                    name="address"
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    value={updatedUserDetails.address}
                    onChange={handleBioChange}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>Age:</strong> {userDetails?.age || "Not set"}
                </p>
                <p>
                  <strong>Gender:</strong> {userDetails?.gender || "Not set"}
                </p>
                <p>
                  <strong>Profession:</strong>{" "}
                  {userDetails?.profession || "Not set"}
                </p>
                <p>
                  <strong>Contact:</strong> {userDetails?.contact || "Not set"}
                </p>
                <p>
                  <strong>Address:</strong> {userDetails?.address || "Not set"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateUserEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
      <UpdatePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
