import { routePaths } from "@/shared/config/routeConfig";
import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import StadiumData from "./StadiumData/StadiumData";
import { useTranslation } from "react-i18next";

function Stadium() {
  const { t } = useTranslation("stadium");

  return (
    <>
      <HeaderSection title={t("Stadium")} path={routePaths.StadiumCreatePage} />
      <StadiumData />
    </>
  );
}

export default memo(Stadium);
