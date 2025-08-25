import API from "@/shared/api";
import type { IClub, IClubById, IClubPatch, IClubPost } from "../types";

export const getClubs = async (
  lang: string,
  search?: string,
  page?: string,
  limit?: string
) => {
  const params: Record<string, string | number> = {};

  if (search) {
    params.search = search;
  }

  if (limit) {
    params.limit = limit;
  }

  if (page) {
    params.page = page;
  }

  return await API.get<{ data: IClub[]; meta: { totalItems: number } }>(
    `/api/v1/admin/club`,
    {
      headers: {
        "x-lang": lang,
      },
      params,
    }
  );
};

export const getClubById = async (id: string) => {
  return await API.get<IClubById>(`/api/v1/admin/club/${id}`);
};

export const createClub = async (data: IClubPost) => {
  return await API.post("/api/v1/admin/club", data);
};

export const deleteClub = async (id: number) => {
  return await API.delete(`/api/v1/admin/club/${id}`);
};

export const updateClub = async (obj: { id: string; data: IClubPatch }) => {
  return await API.patch(`/api/v1/admin/club/${obj.id}`, obj.data);
};
