import { memo } from "react";
import ClubData from "./ClubData/ClubData";
import { HeaderSection } from "@/shared/ui/HeaderSection";
import { routePaths } from "@/shared/config/routeConfig";
import { useTranslation } from "react-i18next";

function Club() {
  const { t } = useTranslation("club");

  return (
    <>
      <HeaderSection title={t("Club")} path={routePaths.ClubCreatePage} />
      <ClubData />
    </>
  );
}

export default memo(Club);
