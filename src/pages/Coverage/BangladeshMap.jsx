import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Pin Icon
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

// FlyTo + Popup handler component
const FlyToDistrict = ({ district }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (district) {
      const { latitude, longitude } = district;
      map.flyTo([latitude, longitude], 11, { duration: 2 });

      if (markerRef.current) {
        markerRef.current.openPopup();
      }

      // Hide popup if zoomed out
      map.on("zoomend", () => {
        if (map.getZoom() < 9 && markerRef.current) {
          markerRef.current.closePopup();
        }
      });
    }
  }, [district, map]);

  return district ? (
    <Marker
      position={[district.latitude, district.longitude]}
      icon={pinIcon}
      ref={markerRef}
    >
      <Popup autoOpen>
        <div className="text-sm">
          <h2 className="font-bold">
            {district.city}, {district.district}
          </h2>
          <p>
            <b>Region:</b> {district.region}
          </p>
          <p>
            <b>Covered:</b> {district.covered_area.join(", ")}
          </p>
          <a
            href={district.flowchart}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            View Flowchart
          </a>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

const BangladeshMap = ({ data, selectedDistrict }) => {
  return (
    <div className="h-[600px] w-full rounded-lg shadow-lg">
      <MapContainer
        center={[23.685, 90.3563]} // Bangladesh center
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Background Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* All Districts Pins */}
        {data.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            icon={pinIcon}
          >
            <Popup>
              <div className="text-sm">
                <h2 className="font-bold">
                  {place.city}, {place.district}
                </h2>
                <p>
                  <b>Region:</b> {place.region}
                </p>
                <p>
                  <b>Covered:</b> {place.covered_area.join(", ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Fly to searched district */}
        <FlyToDistrict district={selectedDistrict} />
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
