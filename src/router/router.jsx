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
import SendParcel from "../pages/Dashboard/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import ParcelDetails from "../pages/Dashboard/ParcelDetails/ParcelDetails";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Coverage },
      {
        path: "services",
        element: (
          <PrivateRoutes>
            <Services></Services>
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
    children: [
      { path: "my-parcels", Component: MyParcels },
      { path: "my-parcels/:id", Component: ParcelDetails },
      { path: "payments/:parcelId", Component: Payment },
      {
        path: "send-parcel",
        Component: SendParcel,
      },
      { path: "payment-history", Component: PaymentHistory },
    ],
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
