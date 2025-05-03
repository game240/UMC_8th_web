import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext)!;
  const location = useLocation();

  if (!isAuthenticated) {
    alert("로그인이 필요한 페이지입니다.");

    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
