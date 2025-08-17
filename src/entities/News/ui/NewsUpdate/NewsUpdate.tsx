import { memo } from "react";
import NewsForm from "../NewsForm/NewsForm";
import { useParams } from "react-router-dom";

function NewsUpdate() {
  const { id } = useParams();

  return <NewsForm id={id} />;
}

export default memo(NewsUpdate);
