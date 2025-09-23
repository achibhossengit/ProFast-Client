import errorImg from "../../assets/errorImg.png";

const NotFound = () => {
  return (
    <div className="bg-base-100 flex flex-col justify-center items-center my-10 rounded-2xl p-10 sm:p-20">
      <div className="max-w-80">
        <img className="w-full" src={errorImg} alt="" />
      </div>
      <button className="btn btn-primary rounded-xl">Back to Home</button>
    </div>
  );
};

export default NotFound;
