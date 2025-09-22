import React from "react";

const faqData = [
  {
    id: 1,
    question: "How can I become a merchant with ProfastCourier?",
    answer:
      "You can sign up online through our Merchant Registration page and submit the required business details. Our team will verify and activate your account quickly.",
  },
  {
    id: 2,
    question: "What areas do you deliver to?",
    answer:
      "We deliver to every district and upazila across Bangladesh, ensuring coverage from major cities to remote areas.",
  },
  {
    id: 3,
    question: "How much is the delivery charge?",
    answer:
      "Our delivery charge depends on package weight and destination. We offer one of the lowest delivery rates in Bangladesh with transparent pricing.",
  },
  {
    id: 4,
    question: "How can I track my parcel?",
    answer:
      "You can track your parcel anytime using the tracking ID provided after booking, directly from our website or mobile app.",
  },
  {
    id: 5,
    question: "What happens if the delivery fails?",
    answer:
      "If a delivery fails, we contact the customer for a second attempt. If still unsuccessful, the parcel is returned to the merchant safely.",
  },
];

const Faq = () => {
  return (
    <div className="mb-10">
      <div className="max-w-4xl mx-auto mb-5">
        <h2 className="text-2xl font-bold text-center text-secondary">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-500 text-center">
          Get answers to common questions about ProfastCourier’s delivery,
          charges, and merchant services.
        </p>
      </div>

      {faqData.map((item, index) => (
        <div
          key={item.id}
          className="collapse collapse-arrow bg-base-100 border border-base-300"
        >
          <input
            type="radio"
            name="faq-accordion"
            defaultChecked={index === 0}
          />
          <div className="collapse-title font-semibold text-secondary">
            {item.question}
          </div>
          <div className="collapse-content text-sm">{item.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
