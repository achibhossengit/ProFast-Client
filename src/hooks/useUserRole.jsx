import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, authLoading } = useAuth();

  const enable = !!user && !authLoading;
  const { data: userRole, isPending } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosSecure.get("user-role");
      return res.data;
    },
    enabled: enable,
    // staleTime: 5 * 60 * 1000, // forcefully cashed the data for 5 mins
    retry: 1,
  });

  return { userRole, roleLoading: isPending || authLoading };
};

export default useUserRole;
