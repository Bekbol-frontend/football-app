import { routePaths } from "@/shared/config/routeConfig";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const check = true;

  return check ? <Outlet /> : <Navigate to={routePaths.Login} replace />;
}

export default memo(ProtectedRoute);
