import API from "@/shared/api";
import type { IPostNews } from "../../types";

export const createNews = async (data: IPostNews) => {
  return API.post("/api/v1/admin/news", data);
};
