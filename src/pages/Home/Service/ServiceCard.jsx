const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl hover:bg-primary transition duration-300">
      <div className="card-body items-center text-center">
        <div className="p-5 bg-base-100 rounded-full">
          <Icon className="text-4xl text-primary"></Icon>
        </div>
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
