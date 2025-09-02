export enum MatchStatus {
  SCHEDULED = "scheduled",
  LIVE = "live",
  HALF_TIME = "half_time",
  FINISHED = "finished",
  POSTPONED = "postponed",
  CANCELLED = "cancelled",
  ABANDONED = "abandoned",
  EXTRA_TIME = "extra_time",
  PENALTY_SHOOTOUT = "penalty_shootout",
  AWARDED = "awarded",
}

export interface IMatchPost {
  clubId: number;
  clubLeagueId: number;
  clubSubLeagueId: number;

  opponentClubId: number;
  opponentLeagueId: number;
  opponentSubLeagueId: number;

  matchDate: string;
  stadiumId: number;
  status: MatchStatus;
  clubScore: number;
  opponentClubScore: number;
}

export const matchStatus: Record<MatchStatus, string> = {
  [MatchStatus.ABANDONED]: "Abandoned",
  [MatchStatus.AWARDED]: "Awarded",
  [MatchStatus.CANCELLED]: "Cancelled",
  [MatchStatus.EXTRA_TIME]: "Extra Time",
  [MatchStatus.FINISHED]: "Finished",
  [MatchStatus.HALF_TIME]: "Half Time",
  [MatchStatus.LIVE]: "Live",
  [MatchStatus.PENALTY_SHOOTOUT]: "Penalty Shootout",
  [MatchStatus.POSTPONED]: "Postponed",
  [MatchStatus.SCHEDULED]: "Scheduled",
};

export interface IMatchData {
  id: number;
  club: {
    id: number;
    name: string;
    logo: string;
  };
  clubLeague: {
    id: number;
    title: string;
  };
  clubSubLeague: null;
  opponentClub: {
    id: number;
    name: string;
    logo: string;
  };
  opponentLeague: {
    id: number;
    title: string;
  };
  opponentSubLeague: null;
  matchDate: string;
  stadium: {
    id: number;
    name: string;
    address: string;
    city: string;
  };
  status: MatchStatus;
  matchScores: [];
  createdAt: string;
  updatedAt: string;
}
