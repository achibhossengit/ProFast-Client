import {
  FaTruck,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";
import ProcessCard from "./ProcessCard";

const processData = [
  {
    icon: FaTruck,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: FaWarehouse,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    icon: FaBuilding,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const Process = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="mx-auto ">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        {/* Process Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processData.map((step, index) => (
            <ProcessCard key={index} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
