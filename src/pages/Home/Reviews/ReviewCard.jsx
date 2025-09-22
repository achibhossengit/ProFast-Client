import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="w-80 h-72 my-5 bg-white rounded-xl shadow-md p-6 mx-auto flex flex-col gap-4">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-primary text-2xl" />

      {/* Review Text */}
      <p className="flex-1 text-gray-700 ">{review.review}</p>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={review.user_photoURL}
          alt={review.userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
          <p className="text-sm text-gray-500">{review.user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
