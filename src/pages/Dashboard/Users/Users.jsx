import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import Pagination from "../../Shared/Pagination";
import { WarehouseContext } from "../../../contexts/WarehouseContext";

const Users = () => {
  const {getDistricts} = useContext(WarehouseContext) 
  const axiosSecure = useAxiosSecure();
  const { role, district } = useParams();

  const [selectedRole, setSelectedRole] = useState(role);
  const [selectedDistrict, SetSelectedDistrict] = useState(district);

  const [totalDataCount, setTotalDataCount] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", selectedRole, selectedDistrict, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?role=${selectedRole === "all" ? "" : selectedRole}&district=${
          selectedDistrict === "all" ? "" : selectedDistrict
        }&page=${currentPage}&limit=${limit}`
      );
      const data = res.data;
      const { totalPages, total } = data.pagination;
      setTotalPages(totalPages || 1);
      setTotalDataCount(total);
      return data.users;
    },
  });

  return (
    <div className="">
      <div className="overflow-auto">
        <table className="table table-zebra table-fixed min-w-[800px]">
          <thead className="">
            <tr className="">
              <th className="w-1/12">#</th>
              <th className="w-3/12">Email</th>
              <th className="w-2/12">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="select select-sm border-none w-full"
                >
                  <option value="">Role</option>
                  <option value="user">User</option>
                  <option value="rider">Rider</option>
                  <option value="admin">Admin</option>
                </select>
              </th>
              <th className="w-2/12">
                <select
                  value={selectedDistrict}
                  onChange={(e) => SetSelectedDistrict(e.target.value)}
                  className="select select-sm border-none w-full"
                >
                  <option value="">District</option>
                  {getDistricts().map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </th>
              <th className="w-2/12">Contact</th>
              <th className="w-2/12">Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <span className="loading"></span>
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                const details = user.details || {};
                return (
                  <tr key={user.email}>
                    <td className="w-1/12">{index + 1}</td>
                    <td className="w-3/12 truncate">
                      <Link
                        to={`/dashboard/users/${user.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {user.name || user.email} <FaEye />
                      </Link>
                    </td>
                    <td className="w-2/12">{user.role}</td>
                    <td className="w-2/12">{details.district || "N/A"}</td>
                    <td className="w-2/12">
                      {details.contact || user.contact || "N/A"}
                    </td>
                    <td className="w-2/12 truncate">
                      {details.district && details.city
                        ? `${details.district}, ${details.city}`
                        : "N/A"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={totalPages}
        totalDataCount={totalDataCount}
      ></Pagination>
    </div>
  );
};

export default Users;
