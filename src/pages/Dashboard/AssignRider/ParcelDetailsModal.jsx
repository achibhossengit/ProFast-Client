const ParcelDetailsModal = ({ parcel, onClose }) => {
  if (!parcel) return null;

  return (
    <dialog id="parcel_modal" className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="text-xl font-semibold mb-3">
          Parcel Details: {parcel.parcel_name}
        </h3>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Date:</span> {parcel.date}
          </p>
          <p>
            <span className="font-semibold">Cost:</span> ৳{parcel.cost}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="font-semibold mb-1">From (Sender)</h4>
              <p>{parcel.sender_name}</p>
              <p>{parcel.sender_contact}</p>
              <p>
                {parcel.sender_region}, {parcel.sender_district},{" "}
                {parcel.sender_area}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-1">To (Receiver)</h4>
              <p>{parcel.receiver_name}</p>
              <p>{parcel.receiver_contact}</p>
              <p>
                {parcel.receiver_region}, {parcel.receiver_district},{" "}
                {parcel.receiver_area}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p>
              <span className="font-semibold">Delivery Status:</span>{" "}
              <span className="badge badge-info badge-outline">
                {parcel.delivery_status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span className="badge badge-success badge-outline">
                {parcel.payment_status}
              </span>
            </p>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ParcelDetailsModal;
