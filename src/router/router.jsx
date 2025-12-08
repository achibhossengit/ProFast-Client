import { createBrowserRouter, Outlet } from "react-router";
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
import Payment from "../pages/Dashboard/Payment/Payment";
import ParcelDetails from "../pages/Dashboard/ParcelDetails/ParcelDetails";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import RiderApplications from "../pages/Dashboard/RiderApplications/RiderApplications";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/Forbiden/Forbiden";
import RiderRoute from "../routes/RiderRoute";
import MyEarnings from "../pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/MyProfile/Profile";
import NonLoggedInRoutes from "../routes/NonLoggedInRoutes";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import Users from "../pages/Dashboard/Users/Users";
import UserDetails from "../pages/Dashboard/UserDetails/UserDetails";
import Parcels from "../pages/Dashboard/Parcels/Parcels";

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
      { index: true, Component: DashboardHome },
      { path: "payments/:parcelId", Component: Payment },
      {
        path: "send-parcel",
        Component: SendParcel,
      },
      { path: "payment-history", Component: PaymentHistory },
      { path: "track-parcel/:id?", Component: TrackParcel },
      { path: "profile", Component: Profile },
      { path: "parcels/:delivery_status/:payment_status", Component: Parcels },
      { path: "parcels/:id", Component: ParcelDetails },

      // admin only routes
      {
        element: (
          <AdminRoute>
            <Outlet></Outlet>
          </AdminRoute>
        ),
        children: [
          { path: "rider-applications", Component: RiderApplications },
          { path: "users/:role/:district", Component: Users },
          { path: "users/:email", Component: UserDetails },
        ],
      },

      // Rider only routes
      {
        element: (
          <RiderRoute>
            <Outlet></Outlet>
          </RiderRoute>
        ),
        children: [{ path: "my-earnings", Component: MyEarnings }],
      },
    ],
  },
  {
    path: "/",
    element: (
      <NonLoggedInRoutes>
        <AuthLayout></AuthLayout>
      </NonLoggedInRoutes>
    ),
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
    ],
  },
]);
