import { MdErrorOutline } from "react-icons/md";
import warehouses from "../../../assets/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ParcelForm = ({ register, watch, disable = false }) => {
  const { user } = useAuth();
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
    <div className="space-y-6">
      {/* Parcel Details */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-3">Parcel details</h2>

          <div className="form-control mb-4">
            <label className="label">Parcel Type</label>
            <div className="flex gap-6">
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
                      className="radio radio-primary"
                      defaultChecked={
                        !watch("parcel_type") && type == "Document"
                      }
                      disabled={disable}
                    />
                    {type}
                  </label>
                ))}
              </div>
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
                disabled={disable}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Parcel Weight (kg)</label>
              <input
                type="number"
                placeholder="ex. 2.5"
                {...register("parcel_weight")}
                className="input w-full"
                disabled={disable || parcelType === "Document"}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            className="cursor-pointer"
            onClick={showPricing}
            disabled={disable}
          >
            <MdErrorOutline />
          </button>
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
                defaultValue={user.displayName}
                className="input w-full"
                disabled={disable}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Sender Contact</label>
              <input
                type="text"
                placeholder="ex. 017XXXXXXXX"
                {...register("sender_contact", { required: true })}
                className="input w-full"
                disabled={disable}
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
                disabled={disable}
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
                disabled={disable}
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
                disabled={disable}
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
              disabled={disable}
            />
          </div>
          <div className="form-control">
            <label className="label">Pickup Instruction</label>
            <textarea
              placeholder="ex. Call before arriving"
              {...register("pickup_instruction")}
              className="textarea textarea-bordered w-full"
              disabled={disable}
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
                disabled={disable}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">Receiver Contact</label>
              <input
                type="text"
                placeholder="ex. 018XXXXXXXX"
                {...register("receiver_contact", { required: true })}
                className="input w-full"
                disabled={disable}
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
                disabled={disable}
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
                disabled={disable}
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
                disabled={disable}
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
              disabled={disable}
            />
          </div>
          <div className="form-control">
            <label className="label">Delivery Instruction</label>
            <textarea
              placeholder="ex. Leave at reception if not home"
              {...register("delivery_instruction")}
              className="textarea textarea-bordered w-full"
              disabled={disable}
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default ParcelForm;
