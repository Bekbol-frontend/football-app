import { memo } from "react";
import { PersonnelForm } from "@/entities/Personnel";
import { useParams } from "react-router-dom";

function PersonnelUpdatePage() {
  const { id } = useParams();

  return <PersonnelForm id={id} />;
}

export default memo(PersonnelUpdatePage);
