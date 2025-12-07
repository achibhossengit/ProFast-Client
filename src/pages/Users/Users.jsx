import { useQuery } from "@tanstack/react-query";
import warehouses from "../../assets/warehouses.json";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMemo, useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const uniqueDistricts = useMemo(
    () => [...new Set(warehouses.map((item) => item.district))],
    []
  );

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", selectedRole, selectedRegion, currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?role=${selectedRole}&warehouse_district=${selectedRegion}&page=${currentPage}&limit=${limit}`
      );
      const data = res.data;
      setTotalPage(data.pagination.totalPages);
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
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="select select-sm border-none w-full"
                >
                  <option value="">District</option>
                  {uniqueDistricts.map((d) => (
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
                    <td className="w-2/12">
                      {details.warehouse_district || "N/A"}
                    </td>
                    <td className="w-2/12">
                      {details.contact || user.contact || "N/A"}
                    </td>
                    <td className="w-2/12 truncate">
                      {details.warehouse_district && details.warehouse_city
                        ? `${details.warehouse_district}, ${details.warehouse_city}`
                        : "N/A"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-2">
        <div className="join">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="join-item btn"
          >
            «
          </button>
          <div>
            <button className="join-item btn">
              Page {currentPage} / {totalPage}
            </button>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="join-item btn"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <button
            disabled={currentPage === totalPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
