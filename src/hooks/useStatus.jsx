import React from "react";

const useStatus = () => {
  const deliveryStatusOptions = {
    pending: "Pending",
    collecting: "Collecting",
    collected: "Collected",
    sendWarehouse: "Send Warehouse",
    delivering: "Delivering",
    delivered: "Delivered",
  };

  const paymentStatusOptions = {
    paid: "Paid",
    unpaid: "UnPaid",
  };

  const status = {
    deliveryStatusOptions,
    paymentStatusOptions,
  };

  return status;
};

export default useStatus;
