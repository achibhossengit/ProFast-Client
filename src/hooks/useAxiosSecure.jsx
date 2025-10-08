import axios from "axios";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000/",
  });

  axiosSecure.interceptors.request.use(async (config) => {
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
