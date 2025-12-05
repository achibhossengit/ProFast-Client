import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { resetPassword } = useAuth(); // assumes you expose Firebase's sendPasswordResetEmail
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await resetPassword(data.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error(error.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
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
            Forgot Password
          </legend>
          <p>Enter your email to reset your password</p>
        </div>

        <label className="label">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <span className="text-red-500 text-sm">Email is required!</span>
        )}

        <button
          disabled={loading}
          className="btn btn-primary text-black mt-4"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-secondary mt-4">
        Remembered your password?{" "}
        <Link to={"/login"} className="text-green-700">
          Login
        </Link>
      </p>

      <div className="divider"> OR </div>
      <p className="text-secondary">
        Don’t have an account?{" "}
        <Link to={"/register"} className="text-green-700">
          Register
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
