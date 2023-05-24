import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UnAuthorized from "@/pages/UnAuthorized";


const Authorized = ({ allowRoles }) => {
  const location = useLocation();
  const { user, isInRole } = useAuth();

  return isInRole(allowRoles) ? (
    <Outlet />
  ) : user ? (
    <UnAuthorized />
  ) : (
    <Navigate to={"/auth/sign-in"} state={{ from: location }} replace />
  );
};

export default Authorized;
