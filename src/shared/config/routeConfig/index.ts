export enum AppRoutes {
  Home = "Home",
  League = "League",
  // 404
  NotFound = "NotFound",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: "/",
  [AppRoutes.League]: "/league",
  // 404
  [AppRoutes.NotFound]: "*",
};
