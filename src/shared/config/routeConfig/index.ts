export enum AppRoutes {
  Home = "Home",
  NewsCreatePage = "NewsCreatePage",
  NewsUpdatePage = "NewsUpdatePage",
  League = "League",
  LeagueCreate = "LeagueCreate",
  LeagueUpdate = "LeagueUpdate",
  Subleague = "Subleague",

  StadiumPage = "StadiumPage",
  StadiumCreatePage = "StadiumCreatePage",
  StadiumUpdatePage = "StadiumUpdatePage",
  Login = "Login",
  // 404
  NotFound = "NotFound",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: "/",
  [AppRoutes.NewsCreatePage]: "/news-create",
  [AppRoutes.NewsUpdatePage]: "/news-update",
  [AppRoutes.League]: "/league",
  [AppRoutes.LeagueCreate]: "/league-create",
  [AppRoutes.LeagueUpdate]: "/league-update",
  [AppRoutes.Subleague]: "/subleague",

  [AppRoutes.StadiumPage]: "/stadium",
  [AppRoutes.StadiumCreatePage]: "/stadium-create",
  [AppRoutes.StadiumUpdatePage]: "/stadium-update",

  [AppRoutes.Login]: "/login",
  // 404
  [AppRoutes.NotFound]: "*",
};
