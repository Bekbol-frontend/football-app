import type { ILeague } from "@/entities/League";
import type { ILang } from "@/shared/types/lang";

export interface ISubleague {
  id: number;
  childLeagues: [];
  clubs: [];

  logo: string;
  parentLeague: ILeague;
  parentLeagueId: number;
  title: string;

  createdAt: string;
  updatedAt: string;
}

export interface ISubleagueForm {
  title: ILang;
  logo: string;
  parentLeagueId: number;
}

export interface ISubleaguePost extends ISubleagueForm {
  logo: string;
}
