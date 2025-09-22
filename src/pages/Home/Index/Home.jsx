import Advantage from "../Advantage/Advantage";
import Banner from "../Banner/Banner";
import BeMarchant from "../BeMarchant/BeMarchant";
import Brands from "../Brands/Brands";
import Faq from "../Faq/Faq";
import Process from "../Process/Process";
import Reviews from "../Reviews/Reviews";
import Services from "../Service/Services";

const Home = () => {
  return (
    <div className="my-5">
      <div>
        <Banner></Banner>
      </div>
      <div>
        <Process></Process>
      </div>
      <div data-aos="fade-up">
        <Services></Services>
      </div>
      <div>
        <Brands></Brands>
      </div>
      <div>
        <Advantage></Advantage>
      </div>
      <div data-aos="zoom-in-up">
        <BeMarchant></BeMarchant>
      </div>
      <div data-aos="fade-right">
        <Reviews></Reviews>
      </div>
      <div data-aos="fade-left">
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
