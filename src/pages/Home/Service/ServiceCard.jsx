const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl ">
      <div className="card-body items-center text-center">
        <Icon className="text-4xl text-primary"></Icon>
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
