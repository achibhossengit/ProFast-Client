import { Link } from "react-router";
import SocialLogin from "../Shared/SocialLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("clicked handle register submit");
    console.log(data);
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
          {...register("name", { required: true })}
          type="text"
          className="input"
          placeholder="Name"
        />
        {errors.name?.type == "required" && (
          <span className="text-red-500 text-sm">
            Name is required to register!
          </span>
        )}

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

        <button className="btn btn-primary text-black mt-4">Register</button>
      </form>

      <p className="text-secondary">
        Already have an account?
        <Link to={"/login"} className="text-green-700">
          Login
        </Link>
      </p>

      <div className="divider"> OR </div>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
