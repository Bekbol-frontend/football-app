export enum AppRoutes {
  Home = "Home",
  League = "League",
  Login = "Login",
  // 404
  NotFound = "NotFound",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: "/",
  [AppRoutes.League]: "/league",
  [AppRoutes.Login]: "/login",
  // 404
  [AppRoutes.NotFound]: "*",
};
