import API from "@/shared/api";
import type { IStadium, IStadiumForm } from "../types";

export const getStadiums = async (
  lang: string,
  limit: string,
  page: string,
  search?: string
) => {
  const params: Record<string, string | number> = {
    limit: limit,
    page: page,
  };

  if (search) {
    params.search = search;
  }

  return await API.get<{ data: IStadium[]; meta: { totalItems: number } }>(
    "/api/v1/admin/stadium",
    {
      headers: {
        "x-lang": lang,
      },
      params,
    }
  );
};

export const getStadiumById = async (id: string) => {
  return await API.get<IStadiumForm>(`/api/v1/admin/stadium/${id}`);
};

export const createStadium = async (data: IStadiumForm) => {
  return await API.post("/api/v1/admin/stadium", data);
};

export const deleteStadium = async (id: number) => {
  return await API.delete(`/api/v1/admin/stadium/${id}`);
};

export const updateStadium = async (obj: {
  id: string;
  data: IStadiumForm;
}) => {
  return await API.patch(`/api/v1/admin/stadium/${obj.id}`, obj.data);
};
