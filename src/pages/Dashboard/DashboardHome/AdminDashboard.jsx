import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaTruckLoading,
  FaTruckMoving,
  FaBoxOpen,
  FaCheckCircle,
  FaUndo,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ["adminParcelStatusCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/status-count");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const statusIcons = {
    pending: <MdPending className="text-yellow-500 text-4xl" />,
    "way-to-collect": <FaTruckLoading className="text-orange-500 text-4xl" />,
    "in-transit": <FaTruckMoving className="text-blue-500 text-4xl" />,
    delivered: <FaCheckCircle className="text-green-500 text-4xl" />,
    returned: <FaUndo className="text-red-500 text-4xl" />,
    default: <FaBoxOpen className="text-gray-500 text-4xl" />,
  };

  const COLORS = [
    "#FACC15", // pending - yellow
    "#FB923C", // way-to-collect - orange
    "#60A5FA", // in-transit - blue
    "#4ADE80", // delivered - green
    "#F87171", // returned - red
  ];

  const processedData = statusCounts.map((item, index) => ({
    name: item.status.replaceAll("-", " "),
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-4xl font-bold text-center mb-6">
        📦 Admin Dashboard
      </h2>

      {/* === STATUS CARDS === */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statusCounts.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition-all"
          >
            <div>{statusIcons[item.status] || statusIcons.default}</div>
            <p className="text-lg font-semibold capitalize mt-3">
              {item.status.replaceAll("-", " ")}
            </p>
            <p className="text-2xl font-bold mt-1">{item.count}</p>
          </div>
        ))}
      </div>

      {/* === PIE CHART === */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          📊 Parcel Status Analytics
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {processedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
