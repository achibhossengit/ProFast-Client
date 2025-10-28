import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://pro-fast-server-rose.vercel.app/" });

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
