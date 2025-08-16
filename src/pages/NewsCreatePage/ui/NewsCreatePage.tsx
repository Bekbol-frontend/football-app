import { NewsForm } from "@/entities/News";
import { memo } from "react";

function NewsCreatePage() {
  return (
    <div>
      <NewsForm />
    </div>
  );
}

export default memo(NewsCreatePage);
