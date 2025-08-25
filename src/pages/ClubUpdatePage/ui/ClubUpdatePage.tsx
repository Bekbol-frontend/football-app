import { ClubForm } from "@/entities/Club";
import { memo } from "react";
import { useParams } from "react-router-dom";

function ClubUpdatePage() {
  const { id } = useParams();

  return <ClubForm id={id} />;
}

export default memo(ClubUpdatePage);
