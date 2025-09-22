import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import customarTop from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    id: "5f47ac10b4f1c03e8c123456",
    user_email: "john.doe@example.com",
    userName: "John Doe",
    review: "Smooth delivery and polite staff.",
    user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c234567",
    user_email: "jane.smith@example.com",
    userName: "Jane Smith",
    review: "Took a bit longer than expected, but okay overall.",
    user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c345678",
    user_email: "alex.brown@example.com",
    userName: "Alex Brown",
    review: "Excellent service! Fast and secure.",
    user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c456789",
    user_email: "lisa.white@example.com",
    userName: "Lisa White",
    review: "Very responsive and professional.",
    user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c567890",
    user_email: "david.lee@example.com",
    userName: "David Lee",
    review: "Late delivery and no updates. Disappointed.",
    user_photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c678901",
    user_email: "nina.khan@example.com",
    userName: "Nina Khan",
    review: "Superb experience! Highly recommended.",
    user_photoURL: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c789012",
    user_email: "michael.jordan@example.com",
    userName: "Michael Jordan",
    review: "Decent service but packaging could be better.",
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: "5f47ac10b4f1c03e8c890123",
    user_email: "emma.watson@example.com",
    userName: "Emma Watson",
    review: "Fast, safe, and friendly delivery service.",
    user_photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const Reviews = () => {
  return (
    <section className="py-12 px-4">
      {/* Top Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <img src={customarTop} alt="Customers" className="mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          What our customers are Sayings
        </h2>
        <p className="text-gray-800">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* Review Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.5, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: true },
        }}
        className="pb-12"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id}>
            <ReviewCard review={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
