import { LangEnum, type TYPE_LANG } from "@/shared/types/lang";

export function returnEmpty(lang: TYPE_LANG, values: string[]) {
  const emptyArray: string[] = [];

  values.forEach((el) => {
    if (!el) {
      const language =
        lang === "en"
          ? LangEnum.EN
          : lang === "ru"
          ? LangEnum.RU
          : lang === "qq"
          ? LangEnum.QQ
          : lang === "kk"
          ? LangEnum.KK
          : lang === "uz"
          ? LangEnum.UZ
          : LangEnum.OZ;
      emptyArray.push(language);
    }
  });

  return emptyArray;
}
