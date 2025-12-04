import { NavLink } from "react-router";
import useUserRole from "../../../hooks/useUserRole";

const NavItems = () => {
  const { userRole, roleLoading } = useUserRole();
  console.log(userRole);
  return (
    <>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      {!roleLoading && (!userRole || userRole === "user") && (
        <>
          <li>
            <NavLink to={"/dashboard/send-parcel"}>Send A Parcel</NavLink>
          </li>
          <li>
            <NavLink to={"/be-rider"}>Be a Rider</NavLink>
          </li>
        </>
      )}
      {!roleLoading && userRole === "rider" && (
        <>
          <li>
            <NavLink to={"/dashboard/my-deliveries"}>My Deliveries</NavLink>
          </li>
        </>
      )}

      {!roleLoading && userRole == "admin" && (
        <>
          <li>
            <NavLink to={"/dashboard/assign-rider"}>Assign Rider</NavLink>
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
