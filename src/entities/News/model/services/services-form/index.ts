import API from "@/shared/api";
import type { INewsOne, IPostNews } from "../../types";

export const createNews = async (data: IPostNews) => {
  return API.post("/api/v1/admin/news", data);
};

export const updateNews = async (obj: { id: string; data: INewsOne }) => {
  return API.patch(`/api/v1/admin/news/${obj.id}`, obj.data);
};
