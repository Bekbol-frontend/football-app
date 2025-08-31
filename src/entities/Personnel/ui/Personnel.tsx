import { routePaths } from "@/shared/config/routeConfig";
import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import PersonnelData from "./PersonnelData/PersonnelData";

function Personnel() {
  const { t } = useTranslation("personnel");

  return (
    <>
      <HeaderSection
        title={t("Personnel")}
        path={routePaths.PersonnelCreatePage}
      />
      <PersonnelData />
    </>
  );
}

export default memo(Personnel);
