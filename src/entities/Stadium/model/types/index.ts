import type { ILang } from "@/shared/types/lang";

export interface IStadium {
  id: number;
  address: string;
  city: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStadiumForm {
  name: ILang;
  address: string;
  city: string;
}
