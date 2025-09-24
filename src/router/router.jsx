import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Index/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoutes from "../routes/PrivateRoutes";
import Services from "../pages/Services/Services";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/services", Component: Coverage },
      {
        path: "services",
        element: (
          <PrivateRoutes>
            <Services></Services>
          </PrivateRoutes>
        ),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
      },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [{ index: true, Component: MyParcels }],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
