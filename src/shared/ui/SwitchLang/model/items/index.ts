import Eng from "@/shared/assets/icon-lang/eng.svg";
import Ru from "@/shared/assets/icon-lang/russ.svg";
import Kk from "@/shared/assets/icon-lang/kk.svg";
import Uz from "@/shared/assets/icon-lang/uzb.svg";
import type { ILangItem } from "../types";

export const objLang: Record<string, ILangItem> = {
  en: {
    text: "English",
    img: Eng,
    key: "en",
  },
  ru: {
    text: "Русский",
    img: Ru,
    key: "ru",
  },
  qq: {
    text: "Qaraqalpaq",
    img: Kk,
    key: "qq",
  },
  kk: {
    text: "Қарақалпақ",
    img: Kk,
    key: "kk",
  },
  uz: {
    text: "O’zbek",
    img: Uz,
    key: "uz",
  },
  oz: {
    text: "Өзбек",
    img: Uz,
    key: "oz",
  },
};
