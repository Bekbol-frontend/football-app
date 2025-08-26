import { SubleagueForm } from "@/entities/Subleague";
import { memo } from "react";
import { useParams } from "react-router-dom";

function SubleagueUpdatePage() {
  const { id } = useParams();

  return <SubleagueForm id={id} />;
}

export default memo(SubleagueUpdatePage);
