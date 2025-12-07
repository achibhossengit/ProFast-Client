import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaPhone,
  FaBriefcase,
  FaMapPin,
  FaIdCard,
  FaMotorcycle,
  FaCertificate,
  FaCity,
  FaWarehouse,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";

const UserDetails = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user data using Tanstack Query
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`users/${email}`);
      return response.data;
    },
    enabled: !!email,
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: () => axiosSecure.delete(`users/${email}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", email] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire("Deleted!", "User has been deleted.", "success");
      window.history.back();
    },
    onError: (err) => {
      console.log(err);
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  // Delete user handler
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user!",
    });

    if (result.isConfirmed) {
      deleteUserMutation.mutate();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return Swal.fire({
      icon: "error",
      title: "User Not Found!",
      text: "Redirecting to Dashboard...",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/dashboard/users");
    });
  }

  return (
    <div className="container mx-auto mt-8 mb-12 px-4 max-w-6xl">
      {/* Photo, Name, and Email Section */}
      <div className="flex flex-col justify-center items-center text-center mb-8">
        <img
          src={user.photoURL || "/avatar.png"}
          onError={(e) => {
            e.currentTarget.src = "/avatar.png";
          }}
          alt={user.name}
          className="w-36 h-36 rounded-full mb-4 object-cover border-4 border-base-200"
        />
        <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
        <p className="text-base-content/70 flex gap-2 items-center">
          <FaEnvelope />
          {user.email}
        </p>
      </div>

      {/* User Details Header with Delete Button */}
      <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-base-300">
        <h4 className="text-2xl font-semibold">User Details</h4>
        <button
          className="btn btn-error"
          onClick={handleDelete}
          disabled={deleteUserMutation.isPending}
        >
          <FaTrash />
          {deleteUserMutation.isPending ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      {/* Non-Details Info in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FaUser className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Role</small>
            <strong className="capitalize">{user.role}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaBirthdayCake className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Age</small>
            <strong>{user.age || "N/A"}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaPhone className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Contact</small>
            <strong>{user.contact || "N/A"}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaBriefcase className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Profession</small>
            <strong>{user.profession || "N/A"}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Address</small>
            <strong>{user.address || "N/A"}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaVenusMars className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Gender</small>
            <strong>{user.gender || "N/A"}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Created At</small>
            <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaClock className="text-primary text-xl" />
          <div>
            <small className="text-base-content/60 block">Last Logged In</small>
            <strong>{new Date(user.lastLoggedIn).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>

      {/* Details Info Section (Conditional) */}
      {user.details && (
        <>
          <div className="pb-4 mb-6 border-b-2 border-base-300">
            <h4 className="text-2xl font-semibold">Details Info</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FaBirthdayCake className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Age (Details)
                </small>
                <strong>{user.details.age || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMapPin className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">Region</small>
                <strong>{user.details.region || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaIdCard className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">NID</small>
                <strong>{user.details.nid || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Contact (Details)
                </small>
                <strong>{user.details.contact || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaMotorcycle className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">Bike Brand</small>
                <strong>{user.details.bike_brand || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCertificate className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Bike Registration
                </small>
                <strong>{user.details.bike_regi || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCity className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Warehouse District
                </small>
                <strong>{user.details.warehouse_district || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaWarehouse className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Warehouse City
                </small>
                <strong>{user.details.warehouse_city || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">Status</small>
                <span
                  className={`badge ${
                    user.details.status === "active"
                      ? "badge-success"
                      : "badge-ghost"
                  }`}
                >
                  {user.details.status || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-success text-xl" />
              <div>
                <small className="text-base-content/60 block">
                  Joined Date
                </small>
                <strong>
                  {user.details.joined_date
                    ? new Date(user.details.joined_date).toLocaleDateString()
                    : "N/A"}
                </strong>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
