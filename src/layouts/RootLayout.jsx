import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-base-200 p-5 sm:p-10">
      <header className="bg-base-100 max-w-7xl mx-auto rounded-xl px-5">
        <Navbar></Navbar>
      </header>
      <main className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </main>
      <footer className="bg-black max-w-7xl mx-auto text-white rounded-2xl px-5">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
