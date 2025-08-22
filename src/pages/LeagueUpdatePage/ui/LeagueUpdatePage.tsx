import { LeagueForm } from "@/entities/League";
import { memo } from "react";
import { useParams } from "react-router-dom";

function LeagueUpdatePage() {
  const { id } = useParams();

  return <LeagueForm id={id} />;
}

export default memo(LeagueUpdatePage);
