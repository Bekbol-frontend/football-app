import API from "@/shared/api";
import type { INews } from "../../types";

export const getNews = async (lang: string, page: string, search: string) => {
  const params: Record<string, string> = {
    page,
    limit: "5",
  };

  if (search) {
    params.search = search;
  }

  return API.get<{
    data: INews[];
    meta: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  }>("/api/v1/admin/news", {
    headers: {
      "x-lang": lang,
      "Cache-Control": "no-cache",
    },
    params,
  });
};
