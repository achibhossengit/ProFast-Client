const ProcessCard = ({ step }) => {
    const {icon: Icon, title, description} = step
  return (
    <div className="card bg-base-100 shadow-md rounded-xl p-6 flex flex-row items-start gap-4">
      <div>
        <Icon className="text-3xl "></Icon>
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
        <p className="text-gray-800 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
