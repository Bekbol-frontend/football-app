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
  kk: {
    text: "Qaraqalpaq",
    img: Kk,
    key: "kk",
  },
  kk_k: {
    text: "Қарақалпақ",
    img: Kk,
    key: "kk_k",
  },
  uz: {
    text: "O’zbek",
    img: Uz,
    key: "uz",
  },
  uz_k: {
    text: "Өзбек",
    img: Uz,
    key: "uz_k",
  },
};
