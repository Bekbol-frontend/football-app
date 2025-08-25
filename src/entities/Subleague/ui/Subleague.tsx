import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import SubleagueData from "./SubleagueData/SubleagueData";
import { routePaths } from "@/shared/config/routeConfig";

function Subleague() {
  return (
    <>
      <HeaderSection path={routePaths.SubleagueCreatePage} title="Subleague" />
      <SubleagueData />
    </>
  );
}

export default memo(Subleague);
