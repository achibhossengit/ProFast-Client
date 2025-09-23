import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../Shared/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("cliked onsubmit");
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
            Wellcome Back
          </legend>
          <p>Login with Profast</p>
        </div>

        <label className="label">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          className="input"
          placeholder="Email"
        />
        {errors.email?.type == "required" && (
          <span className="text-red-500">Email is Required!</span>
        )}

        <label className="label">Password</label>
        <input
          {...register("password")}
          type="password"
          className="input"
          placeholder="Password"
        />

        <Link className="text-secondary hover:text-green-600 mt-4">
          Forgot Password?
        </Link>

        <button className="btn btn-primary text-black">Login</button>
      </form>

      <p className="text-secondary">
        Don't have an account?
        <Link to={"/register"} className="text-green-700">
          Register
        </Link>
      </p>

      <div className="divider"> OR </div>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
