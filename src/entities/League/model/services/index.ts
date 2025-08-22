import API from "@/shared/api";
import type { ILeague, ILueagueCreateData } from "../types";

export const getLeagues = async (
  lang: string,
  limit: number,
  search?: string,
  page?: number
) => {
  const params: Record<string, string | number> = {
    limit: limit,
  };

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = page;
  }

  return API.get<{ data: ILeague[]; meta: { totalItems: number } }>(
    "/api/v1/admin/leagues",
    {
      headers: {
        "x-lang": lang,
      },
      params,
    }
  );
};

export const getLeagueById = async (id?: string) => {
  return API.get<ILeague>(`/api/v1/admin/leagues/${id}`);
};

export const createLeague = async (data: ILueagueCreateData) => {
  return API.post("/api/v1/admin/leagues", data);
};

export const updateLeague = async (obj: {
  id: string;
  data: ILueagueCreateData;
}) => {
  return API.patch(`/api/v1/admin/leagues/${obj.id}`, obj.data);
};

export const deleteLeague = async (id: number) => {
  return API.delete(`/api/v1/admin/leagues/${id}`);
};
