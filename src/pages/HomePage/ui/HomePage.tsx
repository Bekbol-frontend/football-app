import { memo } from "react";
import { useTranslation } from "react-i18next";
import { NewsData } from "@/entities/News";
import { routePaths } from "@/shared/config/routeConfig";
import { HeaderSection } from "@/shared/ui/HeaderSection";

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <HeaderSection title={t("News")} path={routePaths.NewsCreatePage} />
      <NewsData />
    </>
  );
}

export default memo(HomePage);
