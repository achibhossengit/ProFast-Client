import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Shared/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { authLoading, createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        if(userCredential.user?.accessToke) navigate(from)
      })
      .catch((error) => console.log(error));
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
          disabled={authLoading}
          className="btn btn-primary text-black mt-4"
        >
          {authLoading ? "Registering..." : "Register"}
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
