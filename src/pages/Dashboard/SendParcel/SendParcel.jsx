import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ParcelForm from "../Shared/ParcelForm";

const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, reset } = useForm();

  // --- Pricing Calculation ---
  const calculatePrice = (data) => {
    const type = data.parcel_type;
    const weight = parseFloat(data.parcel_weight) || 0;
    const sameCity =
      data.sender_district === data.receiver_district &&
      data.sender_region === data.receiver_region;

    let cost = 0;

    if (type === "Document") {
      cost = sameCity ? 60 : 80;
    } else {
      cost = sameCity ? 110 : 150;
      if (weight > 3) {
        cost += (weight - 3) * 40;
      }
    }

    return cost;
  };

  // --- Submit Handler ---
  const onSubmit = (data) => {
    const cost = calculatePrice(data);

    Swal.fire({
      title: "Confirm Your Parcel",
      html: `
        <div class="text-left">
          <p><b>Parcel Type:</b> ${data.parcel_type}</p>
          <p><b>Parcel Weight:</b> ${data.parcel_weight || "N/A"} kg</p>
          <p><b>Sender:</b> ${data.sender_name}, ${data.sender_contact}</p>
          <p><b>Receiver:</b> ${data.receiver_name}, ${
        data.receiver_contact
      }</p>
          <hr class="my-2"/>
          <p><b>Total Cost:</b> ৳${cost}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm & Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        data = {
          ...data,
          created_by: user.email,
          created_at: new Date().toISOString(),
          delivery_status: "not-collected",
          payment_status: "unpaid",
        };

        console.log("Parcel Data Submitted:", data);

        axiosSecure
          .post("parcels", data)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              // Todo: Redirect payment page after successfully created
              Swal.fire(
                "Success!",
                "Your parcel request has been submitted. Redirecting to Payment page....",
                "success"
              );
              reset();
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Send a Parcel</h1>
      <div className="divider"></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ParcelForm register={register} watch={watch}></ParcelForm>

        <div className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="btn btn-primary">
            Proceed to Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
