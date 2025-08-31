import API from "@/shared/api";
import type { IPersonnelData, IPersonnelPost } from "../types";
import type { ILang } from "@/shared/types/lang";

export const getPersonnel = async (
  lang: string,
  search?: string,
  page?: string,
  limit?: string
) => {
  const params: Record<string, string | number> = {};

  if (search) {
    params.search = search;
  }

  if (page) {
    params.page = page;
  }

  if (limit) {
    params.limit = limit;
  }

  return await API.get<{
    data: IPersonnelData<string>[];
    meta: { totalItems: number };
  }>(`/api/v1/admin/personal`, {
    headers: {
      "x-lang": lang,
    },
    params,
  });
};

export const getPersonnelById = async (id: string) => {
  return await API.get<IPersonnelData<ILang>>(`/api/v1/admin/personal/${id}`);
};

export const createPersonnel = async (data: IPersonnelPost) => {
  return await API.post(`/api/v1/admin/personal`, data);
};

export const deletePersonnel = async (id: number) => {
  return await API.delete(`/api/v1/admin/personal/${id}`);
};

export const updatePersonnel = async (obj: {
  id: string;
  data: IPersonnelPost;
}) => {
  return await API.patch(`/api/v1/admin/personal/${obj.id}`, obj.data);
};
