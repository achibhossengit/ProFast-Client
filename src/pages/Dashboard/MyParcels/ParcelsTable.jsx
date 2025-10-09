import { Link } from "react-router";

const ParcelsTable = ({ parcels }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Parcel Name</th>
            <th>Type</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{new Date(parcel.created_at).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/dashboard/my-parcels/${parcel._id}`}
                  className="text-primary hover:underline"
                >
                  {parcel.parcel_name}
                </Link>
              </td>
              <td>{parcel.parcel_type}</td>
              <td>{parcel.receiver_name}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.delivery_status === "delivered"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.delivery_status}
                </span>
              </td>
              <td>
                {parcel.payment_status === "paid" ? (
                  <span className={"badge badge-success"}>Paid</span>
                ) : (
                  <Link
                    className="badge badge-warning"
                    to={`/dashboard/payments/${parcel._id}`}
                  >
                    Pay
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelsTable;
