import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const AdminRoute = ({children}) => {
    const {userRole , roleLoading} = useUserRole()
    const {logoutUser} = useAuth()

    if(roleLoading) return <LoadingSpinner></LoadingSpinner>

    if(!userRole || userRole !== 'admin') {
        return logoutUser();
    }
    
    return children
};

export default AdminRoute;