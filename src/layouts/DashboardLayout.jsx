import { Outlet } from "react-router";
import DashboardNavitems from "../pages/Shared/Navbar/DashboardNavitems";
import Logo from "../pages/Shared/Logo/Logo";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 flex justify-between lg:justify-end">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-primary btn-outline text-black lg:hidden"
            >
              {/* Sidebar toggle icon */}
              <FaArrowRightToBracket />
            </label>

            <div className="flex justify-center items-center gap-2">
              <h2 className="text-xl font-bold">{user?.displayName}</h2>
              <div className="avatar w-10 h-10">
              <img
                alt="Pro"
                className="rounded-full"
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />

              </div>
            </div>
          </nav>
          {/* Page content here */}
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 ">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              <li className="mb-2">
                <Logo></Logo>
              </li>
              <DashboardNavitems></DashboardNavitems>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
