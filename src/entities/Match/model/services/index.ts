import API from "@/shared/api";
import type { IMatchPost } from "../types";

export const getMatches = async (
  lang: string,
  search?: string,
  page?: string,
  limit?: string
) => {
  const params: Record<string, string | number> = {};

  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  return await API.get("/api/v1/admin/match-schedule", {
    headers: {
      "x-lang": lang,
    },
    params,
  });
};

export const getMatchById = async (id: string) => {
  return await API.get(`/api/v1/admin/match-schedule/${id}`);
};

export const createMatch = async (data: IMatchPost) => {
  return await API.post("/api/v1/admin/match-schedule", data);
};

export const deleteMatch = async (id: string) => {
  return await API.delete(`/api/v1/admin/match-schedule/${id}`);
};

export const getClubMatch = async (id: number) => {
  return API.get<{ id: number; name: string; logo: string }[]>(
    "/api/v1/admin/club/list",
    {
      params: {
        leagueId: id,
      },
    }
  );
};
