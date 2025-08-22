import { NewsForm } from "@/entities/News";
import { memo } from "react";

function NewsCreatePage() {
  return <NewsForm />;
}

export default memo(NewsCreatePage);
