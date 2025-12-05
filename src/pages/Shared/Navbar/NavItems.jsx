import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavItems = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  return (
    <>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      {userRole === "admin" ? (
        <>
          <li>
            <NavLink to={"/dashboard/assign-rider"}>Assign Rider</NavLink>
          </li>
        </>
      ) : userRole === "rider" ? (
        <>
          <li>
            <NavLink to={"/dashboard/my-deliveries"}>My Deliveries</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/dashboard/send-parcel"}>Send A Parcel</NavLink>
          </li>
          <li>
            <NavLink to={"/be-rider"}>Be a Rider</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
    </>
  );
};

export default NavItems;
