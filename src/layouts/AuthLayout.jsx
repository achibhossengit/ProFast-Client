import Logo from "../pages/Shared/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 ">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-5 md:p-10 flex flex-col">
            <div>
              <Logo />
            </div>
            <div className="flex flex-1 justify-center items-center">
              <Outlet />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex justify-center items-center bg-[#FAFDF0] p-5 md:p-10">
            <img
              src={authImg}
              alt="Auth img"
              className="max-w-md w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
