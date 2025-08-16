import API from "@/shared/api";
import type { INews } from "../../types";

export const getNews = async (lang: string) => {
  return API.get<{ data: INews[] }>("/api/v1/admin/news", {
    headers: {
      "x-lang": lang,
      "Cache-Control": "no-cache",
    },
  });
};
