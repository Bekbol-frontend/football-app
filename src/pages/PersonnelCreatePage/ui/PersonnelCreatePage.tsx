import { PersonnelForm } from "@/entities/Personnel";
import { memo } from "react";

function PersonnelCreatePage() {
  return <PersonnelForm />;
}

export default memo(PersonnelCreatePage);
