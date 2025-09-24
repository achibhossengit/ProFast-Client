import { Outlet } from "react-router";
import DashboardNavitems from "../pages/Shared/Navbar/DashboardNavitems";
import Navbar from "../pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <header className="bg-base-300">
        <nav className="max-w-7xl mx-auto px-5">
          <Navbar NavItems={<DashboardNavitems />}></Navbar>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto min-h-[50vh]">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
