import { memo } from "react";
import { Section } from "@/shared/ui/Section";
import { Button, Result } from "antd";
import styles from "./NotFoundPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Section className={styles.notFound}>
      <Result
        status="404"
        title="404"
        subTitle={t("Sorry, the page you visited does not exist.")}
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/", { replace: true })}
          >
            {t("Main page")}
          </Button>
        }
      />
    </Section>
  );
}

export default memo(NotFoundPage);
