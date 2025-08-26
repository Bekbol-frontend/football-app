import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import SubleagueData from "./SubleagueData/SubleagueData";
import { routePaths } from "@/shared/config/routeConfig";
import { useTranslation } from "react-i18next";

function Subleague() {
  const { t } = useTranslation("subleague");

  return (
    <>
      <HeaderSection
        path={routePaths.SubleagueCreatePage}
        title={t("Subleague")}
      />
      <SubleagueData />
    </>
  );
}

export default memo(Subleague);
