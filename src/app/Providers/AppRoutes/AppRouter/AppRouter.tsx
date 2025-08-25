import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import { routePaths } from "@/shared/config/routeConfig";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// pages
import { HomePageAsync } from "@/pages/HomePage";
import { LeaguePageAsync } from "@/pages/LeaguePage";
import { NotFoundPageAsync } from "@/pages/NotFoundPage";
import { AuthLoginPageAsync } from "@/pages/AuthLoginPage";
import { NewsCreatePageAsync } from "@/pages/NewsCreatePage";
import { NewsUpdatePageAsync } from "@/pages/NewsUpdatePage";
import { LeagueCreatePageAsync } from "@/pages/LeagueCreatePage";
import { LeagueUpdatePageAsync } from "@/pages/LeagueUpdatePage";
import { SubleaguePageAsync } from "@/pages/SubleaguePage";
import { StadiumPageAsync } from "@/pages/StadiumPage";
import { StadiumCreatePageAsync } from "@/pages/StadiumCreatePage";
import { StadiumUpdatePageAsync } from "@/pages/StadiumUpdatePage";
import { SubleagueCreatePageAsync } from "@/pages/SubleagueCreatePage";
import { SubleagueUpdatePageAsync } from "@/pages/SubleagueUpdatePage";
import { ClubPageAsync } from "@/pages/ClubPage";
import { ClubCreatePageAsync } from "@/pages/ClubCreatePage";
import { ClubUpdatePageAsync } from "@/pages/ClubUpdatePage";

function AppRouter() {
  return (
    <Routes>
      {/* admin panel */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route path={routePaths.Home} element={<HomePageAsync />} />
          <Route
            path={routePaths.NewsCreatePage}
            element={<NewsCreatePageAsync />}
          />
          <Route
            path={`${routePaths.NewsUpdatePage}/:id`}
            element={<NewsUpdatePageAsync />}
          />
          <Route path={routePaths.League} element={<LeaguePageAsync />} />
          <Route
            path={routePaths.LeagueCreate}
            element={<LeagueCreatePageAsync />}
          />
          <Route
            path={`${routePaths.LeagueUpdate}/:id`}
            element={<LeagueUpdatePageAsync />}
          />

          <Route path={routePaths.Subleague} element={<SubleaguePageAsync />} />
          <Route
            path={routePaths.SubleagueCreatePage}
            element={<SubleagueCreatePageAsync />}
          />
          <Route
            path={`${routePaths.SubleagueUpdatePage}/:id`}
            element={<SubleagueUpdatePageAsync />}
          />

          <Route path={routePaths.StadiumPage} element={<StadiumPageAsync />} />
          <Route
            path={routePaths.StadiumCreatePage}
            element={<StadiumCreatePageAsync />}
          />
          <Route
            path={`${routePaths.StadiumUpdatePage}/:id`}
            element={<StadiumUpdatePageAsync />}
          />

          <Route path={routePaths.ClubPage} element={<ClubPageAsync />} />
          <Route
            path={routePaths.ClubCreatePage}
            element={<ClubCreatePageAsync />}
          />
          <Route
            path={`${routePaths.ClubUpdatePage}/:id`}
            element={<ClubUpdatePageAsync />}
          />
        </Route>
      </Route>

      {/* login page */}
      <Route path={routePaths.Login} element={<AuthLoginPageAsync />} />

      {/* 404 not found page */}
      <Route path={routePaths.NotFound} element={<NotFoundPageAsync />} />
    </Routes>
  );
}

export default memo(AppRouter);
