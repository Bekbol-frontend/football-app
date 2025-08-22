import { StadiumForm } from "@/entities/Stadium";
import { memo } from "react";
import { useParams } from "react-router-dom";

function StadiumUpdatePage() {
  const { id } = useParams();

  return <StadiumForm id={id} />;
}

export default memo(StadiumUpdatePage);
