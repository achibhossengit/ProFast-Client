import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
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

  axiosSecure.interceptors.response.use(
    (response) => {
    return  response;
    },
    (error) => {
      if (error.status === 403) {
        navigate("/forbiden");
      } else if (error.status === 401) {
        // token is invalid
        logoutUser();
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
