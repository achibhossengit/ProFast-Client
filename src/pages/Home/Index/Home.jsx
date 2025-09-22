import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Process from "../Process/Process";
import Services from "../Service/Services";

const Home = () => {
  return (
    <div className="my-5">
      <Banner></Banner>
      <Process></Process>
      <Services></Services>
      <Brands></Brands>
    </div>
  );
};

export default Home;
