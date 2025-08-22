import { HeaderSection } from "@/shared/ui/HeaderSection";
import { memo } from "react";
import SubleagueData from "./SubleagueData/SubleagueData";

function Subleague() {
  return (
    <>
      <HeaderSection path="/" title="Subleague" />
      <SubleagueData />
    </>
  );
}

export default memo(Subleague);
