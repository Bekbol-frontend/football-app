import API from "@/shared/api";
import type { ISubleague, ISubleaguePost } from "../types";

export const getSubleagues = async (
  lang: string,
  limit?: string,
  page?: string,
  search?: string
) => {
  const params: Record<string, string | number> = {};

  if (limit) {
    params.limit = limit;
  }

  if (page) {
    params.page = page;
  }

  if (search) {
    params.search = search;
  }

  return API.get<{
    data: ISubleague[];
    meta: {
      totalItems: number;
      currentPage: number;
      itemsPerPage: number;
      totalPages: number;
    };
  }>("/api/v1/admin/leagues/sub-leagues", {
    headers: {
      "x-lang": lang,
    },
    params,
  });
};

export const createSubleague = async (data: ISubleaguePost) => {
  return API.post("/api/v1/admin/leagues", data);
};

export const deleteSubleague = async (id: number) => {
  return API.delete(`/api/v1/admin/leagues/${id}`);
};
