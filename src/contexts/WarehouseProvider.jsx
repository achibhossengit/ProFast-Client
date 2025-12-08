import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import useAxios from "../hooks/useAxios";
import { WarehouseContext } from "./WarehouseContext";

const WarehouseProvider = ({ children }) => {
  const axiosInstance = useAxios();

  const { data: warehouseColl = [], isLoading: warehouseLoading } = useQuery({
    queryKey: ["warehouseColl"],
    queryFn: async () => {
      // 1. Check sessionStorage first
      const cached = sessionStorage.getItem("warehouseColl");
      if (cached) {
        return JSON.parse(cached);
      }

      // 2. If not cached, fetch from API
      const res = await axiosInstance.get("warehouseColl");
      const data = res.data;

      // 3. Save to sessionStorage
      sessionStorage.setItem("warehouseColl", JSON.stringify(data));

      return data;
    },
    // Optional: prevent refetching on window focus if you only want sessionStorage
    refetchOnWindowFocus: false,
  });

  // Get all unique regions
  const getRegions = useCallback(() => {
    return [...new Set(warehouseColl.map((w) => w.region))];
  }, [warehouseColl]);

  // Get districts
  const getDistricts = useCallback(() => {
    return warehouseColl.map((w) => w.district);
  }, [warehouseColl]);

  // Get districts by region
  const getDistrictsByRegion = useCallback(
    (region) => {
      if (!region) return [];
      return warehouseColl
        .filter((w) => w.region.toLowerCase() === region.toLowerCase())
        .map((w) => w.district);
    },
    [warehouseColl]
  );

  // Get cities by district
  const getCitiesByDistrict = useCallback(
    (district) => {
      if (!district) return [];
      return warehouseColl
        .filter((w) => w.district.toLowerCase() === district.toLowerCase())
        .map((w) => w.city);
    },
    [warehouseColl]
  );

  // Get covered areas by city
  const getAreasByCity = useCallback(
    (city) => {
      if (!city) return [];
      return (
        warehouseColl.find((w) => w.city.toLowerCase() === city.toLowerCase())
          ?.covered_area || []
      );
    },
    [warehouseColl]
  );

  // Bundle utilities together
  const warehouseInfo = useMemo(
    () => ({
      warehouseLoading,
      warehouseColl,
      getRegions,
      getDistricts,
      getDistrictsByRegion,
      getCitiesByDistrict,
      getAreasByCity,
    }),
    [
      warehouseLoading,
      warehouseColl,
      getRegions,
      getDistricts,
      getDistrictsByRegion,
      getCitiesByDistrict,
      getAreasByCity,
    ]
  );

  return <WarehouseContext value={warehouseInfo}>{children}</WarehouseContext>;
};

export default WarehouseProvider;
