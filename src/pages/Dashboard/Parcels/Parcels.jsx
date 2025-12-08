import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from "../../Shared/Pagination";
import { Link, useNavigate, useParams } from "react-router";
import useStatus from "../../../hooks/useStatus";
import useAuth from "../../../hooks/useAuth";
import AssignRiderModal from "./AssignRiderModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Parcels = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userRole = user.role;
  const navigate = useNavigate();
  const { deliveryStatusOptions, paymentStatusOptions } = useStatus();
  const { delivery_status, payment_status } = useParams();
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] =
    useState(delivery_status);
  const [selectedPaymentStatus, setSelectedPaymentStatus] =
    useState(payment_status);

  const [selectToAssign, setSelectToAssign] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: [
      "parcels",
      selectedDeliveryStatus,
      selectedPaymentStatus,
      currentPage,
      limit,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels", {
        params: {
          delivery_status:
            selectedDeliveryStatus === "all" ? "" : selectedDeliveryStatus,
          payment_status:
            selectedPaymentStatus === "all" ? "" : selectedPaymentStatus,
          page: currentPage,
          limit: limit,
        },
      });
      const data = res.data;
      const { total, totalPages } = data.pagination;
      setTotalPages(totalPages || 1);
      setTotalDataCount(total);
      return data.data;
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`parcels/${parcelId}/status`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status Updated Successfully!");
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Something Went Wrong! Try Again!");
    },
  });

  const handleStatusChange = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the parcel status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusMutation.mutate(parcelId);
      }
    });
  };

  useEffect(() => {
    navigate(
      `/dashboard/parcels/${selectedDeliveryStatus}/${selectedPaymentStatus}`
    );
  }, [selectedDeliveryStatus, selectedPaymentStatus, navigate]);

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4">My Parcels</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Parcel Name</th>
                <th>From</th>
                <th>To</th>
                <th>
                  <select
                    value={selectedDeliveryStatus}
                    onChange={(e) => setSelectedDeliveryStatus(e.target.value)}
                    className="select select-sm border-none"
                  >
                    <option value="*" hidden>
                      -- Select --
                    </option>
                    <option value="all">Status</option>
                    {Object.entries(deliveryStatusOptions).map(
                      ([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </th>
                <th>
                  <select
                    value={selectedPaymentStatus}
                    onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                    className="select select-sm border-none"
                  >
                    <option value="*" hidden>
                      -- Select --
                    </option>
                    <option value="all">Payment Status</option>
                    {Object.entries(paymentStatusOptions).map(
                      ([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className=" text-center">
                    <span className="loading"></span>
                  </td>
                </tr>
              ) : parcels.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Parcel found With this status!
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => {
                  const {
                    _id,
                    parcel_name,
                    sender_district,
                    receiver_district,
                    delivery_status,
                    payment_status,
                  } = parcel;

                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/dashboard/parcels/${_id}`}
                          className="text-info btn-link hover:underline"
                        >
                          {parcel_name}
                        </Link>
                      </td>
                      <td>{sender_district}</td>
                      <td>{receiver_district}</td>
                      <td>
                        {userRole === "admin" &&
                        (delivery_status === "pending" ||
                          delivery_status === "sendWarehouse") ? (
                          <button
                            disabled={payment_status === "unpaid"}
                            onClick={() => setSelectToAssign(parcel)}
                            className="badge badge-success badge-outline hover:badge disabled:badge-ghost cursor-pointer"
                          >
                            {delivery_status === "pending"
                              ? "Assign To Collect"
                              : "Assign To Deliver"}
                          </button>
                        ) : userRole === "rider" ? (
                          <button
                            disabled={
                              delivery_status === "delivered" ||
                              delivery_status === "sendWarehouse"
                            }
                            onClick={() => handleStatusChange(parcel._id)}
                            className="badge badge-success badge-outline hover:badge disabled:badge-ghost cursor-pointer"
                          >
                            {delivery_status}
                          </button>
                        ) : (
                          <p
                            className={`badge ${
                              delivery_status === "pending"
                                ? "badge-error"
                                : "badge-success"
                            }`}
                          >
                            {delivery_status}
                          </p>
                        )}
                      </td>
                      <td>
                        {payment_status === "paid" ? (
                          <span className={"badge badge-success"}>Paid</span>
                        ) : parcel.created_by === user.email ? (
                          <Link
                            className="badge badge-warning badge-outline hover:badge"
                            to={`/dashboard/payments/${parcel._id}`}
                          >
                            Pay Now
                          </Link>
                        ) : (
                          <p className="badge badge-warning">Not Paid</p>
                        )}
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

      {selectToAssign && (
        <AssignRiderModal
          onClose={() => setSelectToAssign(null)}
          parcel={selectToAssign}
        />
      )}
    </div>
  );
};

export default Parcels;
