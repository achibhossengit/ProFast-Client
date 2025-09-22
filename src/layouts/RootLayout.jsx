import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-base-200 p-10">
      <header className="bg-base-100 rounded-xl">
        <Navbar></Navbar>
      </header>
      <main className="">
        <Outlet></Outlet>
      </main>
      <footer className="bg-black text-white rounded-2xl">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
