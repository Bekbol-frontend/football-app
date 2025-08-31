export enum AppRoutes {
  Home = "Home",
  NewsCreatePage = "NewsCreatePage",
  NewsUpdatePage = "NewsUpdatePage",
  League = "League",
  LeagueCreate = "LeagueCreate",
  LeagueUpdate = "LeagueUpdate",
  Subleague = "Subleague",
  SubleagueCreatePage = "SubleagueCreatePage",
  SubleagueUpdatePage = "SubleagueUpdatePage",

  StadiumPage = "StadiumPage",
  StadiumCreatePage = "StadiumCreatePage",
  StadiumUpdatePage = "StadiumUpdatePage",

  ClubPage = "ClubPage",
  ClubCreatePage = "ClubCreatePage",
  ClubUpdatePage = "ClubUpdatePage",

  MatchPage = "MatchPage",
  MatchCreatePage = "MatchCreatePage",
  MatchUpdatePage = "MatchUpdatePage",

  PersonnelPage = "PersonnelPage",
  PersonnelCreatePage = "PersonnelCreatePage",
  PersonnelUpdatePage = "PersonnelUpdatePage",

  // login
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
  [AppRoutes.SubleagueCreatePage]: "/subleague-create",
  [AppRoutes.SubleagueUpdatePage]: "/subleague-update",

  [AppRoutes.StadiumPage]: "/stadium",
  [AppRoutes.StadiumCreatePage]: "/stadium-create",
  [AppRoutes.StadiumUpdatePage]: "/stadium-update",

  [AppRoutes.ClubPage]: "/club",
  [AppRoutes.ClubCreatePage]: "/club-create",
  [AppRoutes.ClubUpdatePage]: "/club-update",

  [AppRoutes.MatchPage]: "/match",
  [AppRoutes.MatchCreatePage]: "/match-create",
  [AppRoutes.MatchUpdatePage]: "/match-update",

  [AppRoutes.PersonnelPage]: "/personnel",
  [AppRoutes.PersonnelCreatePage]: "/personnel-create",
  [AppRoutes.PersonnelUpdatePage]: "/personnel-update",

  // login
  [AppRoutes.Login]: "/login",
  // 404
  [AppRoutes.NotFound]: "*",
};
