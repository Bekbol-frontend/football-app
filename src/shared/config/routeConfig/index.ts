export enum AppRoutes {
  Home = "Home",
  NewsCreatePage = "NewsCreatePage",
  NewsUpdatePage = "NewsUpdatePage",
  League = "League",
  Login = "Login",
  // 404
  NotFound = "NotFound",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: "/",
  [AppRoutes.NewsCreatePage]: "/news-create",
  [AppRoutes.NewsUpdatePage]: "/news-update",
  [AppRoutes.League]: "/league",
  [AppRoutes.Login]: "/login",
  // 404
  [AppRoutes.NotFound]: "*",
};
