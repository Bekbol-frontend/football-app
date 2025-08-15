import { memo } from "react";
import { Section } from "@/shared/ui/Section";
import styles from "./PageLoading.module.scss";
import { Spin } from "antd";

function PageLoading() {
  return (
    <Section className={styles.pageLoading}>
      <Spin size="large" />
    </Section>
  );
}

export default memo(PageLoading);
