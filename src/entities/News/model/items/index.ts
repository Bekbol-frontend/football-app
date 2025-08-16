import { NewsStatus } from "../types";

export const selectItems = [
  { value: NewsStatus.DRAFT, label: "Draft" },
  { value: NewsStatus.PUBLISHED, label: "Published" },
  { value: NewsStatus.ARCHIVED, label: "Archived" },
  { value: NewsStatus.DELETED, label: "Deleted" },
  { value: NewsStatus.PENDING, label: "Pending" },
];
