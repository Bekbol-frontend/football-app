import type { ILang } from "@/shared/types/lang";

export interface ILeague {
  id: number;
  childLeagues: string[];
  clubs: string[];
  parentLeague?: string;

  logo: string;
  title: string;

  createdAt: string;
  updatedAt: string;
}

export interface ILueagueForm {
  title: ILang;
}

export interface ILueagueCreateData {
  title: ILang;
  logo: string;
}
