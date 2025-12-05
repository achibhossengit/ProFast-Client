import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser, getAuth } from "firebase/auth";

const SocialLogin = ({ from }) => {
  const { loginWithGoogle } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const handleSocialLogin = async () => {
    setLoginLoading(true);
    try {
      const res = await loginWithGoogle();
      const email = res.user?.email;
      const accessToken = res.user?.accessToken;

      if (accessToken) {
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

      navigate(from);
    } catch {
      // rollback Firebase user if DB or profile update fails
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
        console.warn("Firebase user deleted due to incomplete registration.");
      }

      toast.error("Login Failed! Try again later!");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <button
      disabled={loginLoading}
      onClick={handleSocialLogin}
      className="btn bg-white text-black border-[#e5e5e5] w-full"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Continue with Google
    </button>
  );
};

export default SocialLogin;
