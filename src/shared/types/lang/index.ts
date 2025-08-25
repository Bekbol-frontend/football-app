export type TYPE_LANG = "en" | "ru" | "qq" | "kk" | "uz" | "oz";

export interface ILang {
  en: string;
  ru: string;
  qq: string;
  kk: string;
  uz: string;
  oz: string;
}

export enum LangEnum {
  EN = "English",
  RU = "Русский",
  QQ = "Qaraqalpaq",
  KK = "Қарақалпақ",
  UZ = "O’zbek",
  OZ = "Өзбек",
}

export enum LangEnumShort {
  EN = "en",
  RU = "ru",
  QQ = "qq",
  KK = "kk",
  UZ = "uz",
  OZ = "oz",
}
