import type { ILang } from "@/shared/types/lang";

interface IClubLeague {
  id: number;
  title: string;
}

export interface IClub {
  id: number;
  information: string;
  league: IClubLeague;
  subLeague: IClubLeague;
  logo: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClubById {
  id: number;
  information: ILang;
  league: { id: number; title: ILang };
  subLeague: { id: number; title: ILang };
  logo: string;
  name: ILang;
  createdAt: string;
  updatedAt: string;
}

export interface IClubForm {
  name: ILang;
  information: ILang;
  leagueId: number;
  subLeagueId: number;
}

export interface IClubPost extends IClubForm {
  logo: string;
}

export interface IClubPatch {
  name: ILang;
  logo: string;
  leagueId: number;
  subLeagueId: number;
  information: ILang;
}
