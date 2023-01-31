import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const userData = useSelector((state) => state.auth.userData);

  return userData.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
