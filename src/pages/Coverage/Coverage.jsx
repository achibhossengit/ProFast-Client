import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import data from "../../assets/warehouses.json";

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const found = data.find((place) =>
      place.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (found) {
      setSelectedDistrict(found);
      setNotFound(false);
    } else {
      setSelectedDistrict(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-4">
        We are available in 64 districts
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search your district..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Not Found Message */}
      {notFound && (
        <p className="text-center text-red-500 font-medium mb-4">
          No district found with this name.
        </p>
      )}

      {/* Bangladesh Map */}
      <BangladeshMap data={data} selectedDistrict={selectedDistrict} />
    </div>
  );
};

export default Coverage;
