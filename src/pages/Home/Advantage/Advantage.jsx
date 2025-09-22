import call from "../../../assets/advantage/call.png";
import location from "../../../assets/advantage/location.png";
import safe from "../../../assets/advantage/safe.jpg";

const advantagesData = [
  {
    img: location,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: safe,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: call,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Advantage = () => {
  return (
    <section className="py-10 border-y border-dashed border-gray-500">
      <div className="flex flex-col gap-5">
        {advantagesData.map((adv, index) => (
          <div
            key={index}
            className="flex bg-white rounded-xl p-5 items-center"
          >
            {/* Left Image */}
            <img
              src={adv.img}
              alt={adv.title}
              className="w-48 h-48 object-contain"
            />

            {/* Divider */}
            <div className="divider divider-horizontal"></div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-secondary">
                {adv.title}
              </h3>
              <p className="text-gray-800 text-sm mt-2">{adv.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantage;
