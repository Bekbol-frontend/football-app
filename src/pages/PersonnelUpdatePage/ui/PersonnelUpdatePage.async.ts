import { lazy } from "react";

export const PersonnelUpdatePageAsync = lazy(
  () => import("./PersonnelUpdatePage")
);
