import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { getMatches } from "../../model/services";
import { queryKey } from "@/shared/consts/queryKey";
import { useTranslation } from "react-i18next";

function MatchData() {
  const { i18n } = useTranslation("match");

  const { data } = useQuery({
    queryFn: () => getMatches(i18n.language),
    queryKey: [queryKey.matches, i18n.language],
  });

  console.log(data);

  return <div>MatchData</div>;
}

export default memo(MatchData);
