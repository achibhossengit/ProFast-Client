import { useForm } from "react-hook-form";
import warehouses from "../../assets/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();
  const parcelType = watch("parcel_type", "Document");

  // --- Sender dependent states ---
  const senderRegion = watch("sender_region");
  const senderDistrict = watch("sender_district");

  // --- Receiver dependent states ---
  const receiverRegion = watch("receiver_region");
  const receiverDistrict = watch("receiver_district");

  //   filter functions
  const findDistricts = (region) => {
    const filtered = warehouses.filter((w) => w.region === region);
    const dist = [...new Set(filtered.map((w) => w.district))];
    return dist;
  };

  const findAreaList = (district) => {
    const filtered = warehouses.filter((w) => w.district === district);
    const areaList = filtered.flatMap((w) => w.covered_area);
    return areaList;
  };

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
        reset();
        Swal.fire(
          "Success!",
          "Your parcel request has been submitted.",
          "success"
        );
      }
    });
  };

  // --- Show Pricing Modal Handler ---
  const showPricing = () => {
    Swal.fire({
      title: "Parcel Pricing Table",
      html: `
        <table class="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th class="border px-2 py-1">Parcel Type</th>
              <th class="border px-2 py-1">Weight</th>
              <th class="border px-2 py-1">Within City</th>
              <th class="border px-2 py-1">Outside City/District</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-2 py-1">Document</td>
              <td class="border px-2 py-1">Any</td>
              <td class="border px-2 py-1">৳60</td>
              <td class="border px-2 py-1">৳80</td>
            </tr>
            <tr>
              <td class="border px-2 py-1">Non-Document</td>
              <td class="border px-2 py-1">Up to 3kg</td>
              <td class="border px-2 py-1">৳110</td>
              <td class="border px-2 py-1">৳150</td>
            </tr>
            <tr>
              <td class="border px-2 py-1">Non-Document</td>
              <td class="border px-2 py-1">&gt;3kg</td>
              <td class="border px-2 py-1">+৳40/kg</td>
              <td class="border px-2 py-1">+৳40/kg + ৳40 extra</td>
            </tr>
          </tbody>
        </table>
      `,
      width: "600px",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Send a Parcel</h1>
      <div className="divider"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Details */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Enter Your Parcel details
          </h2>

          <div className="form-control mb-4">
            <label className="label">Parcel Type</label>
            <div className="flex gap-6">
              {["Document", "Non-Document"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("parcel_type")}
                    defaultChecked={type === "Document"}
                    className="radio radio-primary"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="form-control w-full">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                placeholder="ex. Legal Documents"
                {...register("parcel_name")}
                className="input w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Parcel Weight (kg)</label>
              <input
                type="number"
                placeholder="ex. 2.5"
                {...register("parcel_weight")}
                className="input w-full"
                disabled={parcelType === "Document"}
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Sender & Receiver Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sender */}
          <div className="flex-1 space-y-4">
            <h3 className="text-md font-semibold mb-3">Sender Details</h3>

            {/* Name & Contact */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control w-full">
                <label className="label">Sender Name</label>
                <input
                  type="text"
                  placeholder="ex. Achib Hossen"
                  {...register("sender_name", { required: true })}
                  className="input w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">Sender Contact</label>
                <input
                  type="text"
                  placeholder="ex. 017XXXXXXXX"
                  {...register("sender_contact", { required: true })}
                  className="input w-full"
                />
              </div>
            </div>

            {/* Region / District / Area */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control w-full">
                <label className="label">Region</label>
                <select
                  {...register("sender_region")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {[...new Set(warehouses.map((w) => w.region))].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">District</label>
                <select
                  {...register("sender_district")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {findDistricts(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">Area</label>
                <select
                  {...register("sender_area")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Area</option>
                  {findAreaList(senderDistrict).map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address & Instruction */}
            <div className="form-control">
              <label className="label">Pickup Address</label>
              <input
                type="text"
                placeholder="ex. House 12, Road 3, Dhanmondi"
                {...register("pickup_address")}
                className="input w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">Pickup Instruction</label>
              <textarea
                placeholder="ex. Call before arriving"
                {...register("pickup_instruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver */}
          <div className="flex-1 space-y-4">
            <h3 className="text-md font-semibold mb-3">Receiver Details</h3>

            {/* Name & Contact */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control w-full">
                <label className="label">Receiver Name</label>
                <input
                  type="text"
                  placeholder="ex. Nafisa Rahman"
                  {...register("receiver_name", { required: true })}
                  className="input w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">Receiver Contact</label>
                <input
                  type="text"
                  placeholder="ex. 018XXXXXXXX"
                  {...register("receiver_contact", { required: true })}
                  className="input w-full"
                />
              </div>
            </div>

            {/* Region / District / Area */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control w-full">
                <label className="label">Receiver Region</label>
                <select
                  {...register("receiver_region")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {[...new Set(warehouses.map((w) => w.region))].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">Receiver District</label>
                <select
                  {...register("receiver_district")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {findDistricts(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">Receiver Area</label>
                <select
                  {...register("receiver_area")}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Area</option>
                  {findAreaList(receiverDistrict).map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address & Instruction */}
            <div className="form-control">
              <label className="label">Delivery Address</label>
              <input
                type="text"
                placeholder="ex. Flat B2, Block C, Bashundhara"
                {...register("delivery_address")}
                className="input w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">Delivery Instruction</label>
              <textarea
                placeholder="ex. Leave at reception if not home"
                {...register("delivery_instruction")}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={showPricing}
            className="btn btn-outline"
          >
            Show Pricing
          </button>
          <button type="submit" className="btn btn-primary">
            Proceed to Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
