import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import { routePaths } from "@/shared/config/routeConfig";
import { HomePageAsync } from "@/pages/HomePage";
import { LeaguePageAsync } from "@/pages/LeaguePage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routePaths.Home} element={<HomePageAsync />} />
        <Route path={routePaths.League} element={<LeaguePageAsync />} />
      </Route>
    </Routes>
  );
}

export default memo(AppRouter);
