import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Index/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoutes from "../routes/PrivateRoutes";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/Dashboard/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import ParcelDetails from "../pages/Dashboard/ParcelDetails/ParcelDetails";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import RiderApplications from "../pages/Dashboard/RiderApplications/RiderApplications";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/Forbiden/Forbiden";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Coverage },
      {
        path: "be-rider",
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
      },
      { path: "forbiden", Component: Forbidden },
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
      { path: "track-parcel/:id?", Component: TrackParcel },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider />
          </AdminRoute>
        ),
      },
      {
        path: "rider-applications",
        element: (
          <AdminRoute>
            <RiderApplications />
          </AdminRoute>
        ),
      },
      {
        path: "riders",
        element: (
          <AdminRoute>
            <ActiveRiders />
          </AdminRoute>
        ),
      },
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
