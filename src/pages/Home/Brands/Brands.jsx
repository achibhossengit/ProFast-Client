import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import starPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

const Brands = () => {
  const logos = [
    amazon,
    casio,
    moonstar,
    amazonVector,
    randstad,
    start,
    starPeople,
  ];

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          We've helped thousands of sales teams
        </h2>

        {/* Marquee */}
        <Marquee speed={40} pauseOnHover={true}>
          <div className="flex justify-center items-center">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="brand logo"
                className="w-28 mr-24 object-contain"
              />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Brands;
