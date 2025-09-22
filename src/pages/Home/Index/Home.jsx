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
      <Banner></Banner>
      <Process></Process>
      <Services></Services>
      <Brands></Brands>
      <Advantage></Advantage>
      <BeMarchant></BeMarchant>
      <Reviews></Reviews>
      <Faq></Faq>
    </div>
  );
};

export default Home;
