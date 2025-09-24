import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavItems = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <li>
          <NavLink to={"/Dashboard"}>Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/be-rider"}>Be a Rider</NavLink>
      </li>
    </>
  );
};

export default NavItems;
