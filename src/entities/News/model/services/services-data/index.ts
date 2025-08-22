import API from "@/shared/api";
import type { INews, INewsOne } from "../../types";

export const getNews = async (
  limit: string,
  lang: string,
  page: string,
  search: string
) => {
  const params: Record<string, string> = {
    page,
    limit: limit,
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

export const deleteNews = async (id: number) => {
  return API.delete(`/api/v1/admin/news/${id}`);
};

export const getNewsById = async (id?: string) => {
  return API.get<INewsOne>(`/api/v1/admin/news/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};
