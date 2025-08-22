import { memo } from "react";
import LeagueData from "./LeagueData/LeagueData";
import { useTranslation } from "react-i18next";
import { HeaderSection } from "@/shared/ui/HeaderSection";
import { routePaths } from "@/shared/config/routeConfig";

function League() {
  const { t } = useTranslation("league");

  return (
    <>
      <HeaderSection title={t("League")} path={routePaths.LeagueCreate} />
      <LeagueData />
    </>
  );
}

export default memo(League);
