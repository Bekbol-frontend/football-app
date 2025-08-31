import type { ILang } from "@/shared/types/lang";

export interface IPersonnelForm {
  fullName: ILang;
  position: ILang;
  information: ILang;
  phone: string;
  email: string;
}

export interface IPersonnelPost extends IPersonnelForm {
  avatar: string;
}

export interface IPersonnelData<T> {
  id: number;
  fullName: T;
  position: T;
  information: T;
  phone: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
