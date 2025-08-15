import { routePaths } from "@/shared/config/routeConfig";
import { useGetUser } from "@/shared/lib/hooks/useGetUser";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const check = useGetUser();

  return check ? <Outlet /> : <Navigate to={routePaths.Login} replace />;
}

export default memo(ProtectedRoute);
