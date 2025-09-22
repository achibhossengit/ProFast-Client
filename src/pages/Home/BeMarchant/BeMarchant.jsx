import marchantImg from "../../../assets/location-merchant.png";

const BeMarchant = () => {
  return (
    <section className="my-10 bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-secondary p-6 md:p-10 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Left Text Content */}
        <div className="flex-1 text-base-100 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-snug max-w-xl mx-auto md:mx-0">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="mb-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button className="btn btn-primary rounded-full text-sm sm:text-base px-4 sm:px-6">
              Become a Merchant
            </button>
            <button className="btn btn-primary btn-outline rounded-full text-sm sm:text-base px-4 sm:px-6">
              Earn With ProfastCourier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-40 sm:w-56 md:w-72 lg:w-96 flex-shrink-0">
          <img
            src={marchantImg}
            alt="Become a Merchant"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default BeMarchant;
