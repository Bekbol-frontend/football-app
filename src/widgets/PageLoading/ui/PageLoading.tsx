import { memo } from "react";
import styles from "./PageLoading.module.scss";
import { Spin } from "antd";

function PageLoading() {
  return (
    <div className={styles.pageLoading}>
      <Spin size="large" />
    </div>
  );
}

export default memo(PageLoading);
