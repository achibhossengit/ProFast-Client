import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Shared/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { deleteUser, getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();
  const [userLoading, setUserLoading] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleImageUpload = async (e) => {
    setProfilePicLoading(true);
    try {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      const uploadURL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;

      const res = await axios.post(uploadURL, formData);
      setProfilePic(res.data.data.display_url);
    } catch (error) {
      console.log(error);
      toast.error("Image Upload Failed!");
    } finally {
      setProfilePicLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setUserLoading(true);
    try {
      const userCredential = await createUser(data.email, data.password);
      const email = userCredential?.user?.email;
      const accessToken = userCredential?.user?.accessToken;

      if (accessToken) {
        // Save user to DB
        await axiosInstance.post(
          "users",
          { email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      // Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      navigate(from);
    } catch (error) {
      console.error("Something went wrong:", error);

      // rollback Firebase user if DB or profile update fails
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
        console.warn("Firebase user deleted due to incomplete registration.");
      }

      // Show user-friendly error
      toast.error("Registration failed. Please try again.");
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fieldset border-none rounded-box w-xs border"
      >
        <div>
          <legend className="fieldset-legend text-2xl font-bold">
            Create an Account
          </legend>
          <p>Register with Profast</p>
        </div>

        <label className="label">Name</label>
        <input
          {...register("name")}
          type="text"
          className="input"
          placeholder="Name"
        />

        <label className="label">Profile Photo</label>
        <input
          onChange={handleImageUpload}
          type="file"
          className="file-input"
        />

        <label className="label">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email?.type == "required" && (
          <span className="text-red-500 text-sm">Email is required!</span>
        )}

        <label className="label">Password</label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          className="input"
          placeholder="Password"
        />
        <span className="text-red-500 text-sm">
          {errors.password?.type == "required"
            ? "Password is required!"
            : errors.password?.type == "minLength"
            ? "Password must be at least 6 char or more!"
            : ""}{" "}
        </span>

        <button
          disabled={userLoading || profilePicLoading}
          className="btn btn-primary text-black mt-4"
        >
          {userLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-secondary">
        Already have an account?
        <Link to={"/login"} className="text-green-700">
          Login
        </Link>
      </p>

      <div className="divider"> OR </div>
      <SocialLogin from={from}></SocialLogin>
    </div>
  );
};

export default Register;
