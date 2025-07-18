import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import { routePaths } from "@/shared/config/routeConfig";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// pages
import { HomePageAsync } from "@/pages/HomePage";
import { LeaguePageAsync } from "@/pages/LeaguePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AuthLoginPageAsync } from "@/pages/AuthLoginPage";

function AppRouter() {
  return (
    <Routes>
      {/* admin panel */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route path={routePaths.Home} element={<HomePageAsync />} />
          <Route path={routePaths.League} element={<LeaguePageAsync />} />
        </Route>
      </Route>

      {/* login page */}
      <Route path={routePaths.Login} element={<AuthLoginPageAsync />} />

      {/* 404 not found page */}
      <Route path={routePaths.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default memo(AppRouter);
