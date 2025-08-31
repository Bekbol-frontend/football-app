import { lazy } from "react";

export const PersonnelCreatePageAsync = lazy(
  () => import("./PersonnelCreatePage")
);
