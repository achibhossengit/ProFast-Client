import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Shared/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, authLoading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((res) => {
        if (res?.user?.accessToken) navigate(from);
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

        <button disabled={authLoading} className="btn btn-primary text-black">
          {authLoading ? "Loging..." : "Login"}{" "}
        </button>
      </form>

      <p className="text-secondary">
        Don't have an account?
        <Link to={"/register"} className="text-green-700">
          Register
        </Link>
      </p>

      <div className="divider"> OR </div>
      <SocialLogin from={from}></SocialLogin>
    </div>
  );
};

export default Login;
