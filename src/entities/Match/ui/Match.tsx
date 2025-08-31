import { routePaths } from "@/shared/config/routeConfig";
import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import MatchData from "./MatchData/MatchData";

function Match() {
  return (
    <>
      <HeaderSection title="Match" path={routePaths.MatchCreatePage} />
      <MatchData />
    </>
  );
}

export default memo(Match);
