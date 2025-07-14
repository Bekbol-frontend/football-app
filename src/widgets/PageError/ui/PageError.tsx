import { Section } from "@/shared/ui/Section";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

function PageError() {
  const { t } = useTranslation();

  return (
    <Section>
      <Result
        status="500"
        subTitle={t("Sorry, something went wrong.")}
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            {t("Reload page")}
          </Button>
        }
      />
    </Section>
  );
}

export default PageError;
