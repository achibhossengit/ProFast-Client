import { FiEdit, FiTrash2 } from "react-icons/fi";

const ParcelsTable = ({ parcels, onDelete, onUpdate, onDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Parcel Name</th>
            <th>Type</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Receiver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>
                <button
                  className="text-primary hover:underline"
                  onClick={() => onDetails(parcel._id)}
                >
                  {parcel.parcel_name}
                </button>
              </td>
              <td >{parcel.parcel_type}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
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
              <td>{new Date(parcel.created_at).toLocaleDateString()}</td>
              <td>{parcel.receiver_name}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => onUpdate(parcel)}
                  className="btn btn-sm btn-outline"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => onDelete(parcel._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelsTable;
