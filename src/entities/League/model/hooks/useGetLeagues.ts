import { queryKey } from "@/shared/consts/queryKey";
import { useQuery } from "@tanstack/react-query";
import { getLeagues } from "../services";

export const useGetLeagues = (
  lang: string,
  limit: number,
  search?: string,
  page?: number
) => {
  return useQuery({
    queryKey: [queryKey.leagues, lang, limit, search, page],
    queryFn: () => getLeagues(lang, limit, search, page),
  });
};
