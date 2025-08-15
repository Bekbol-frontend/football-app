import { memo } from "react";
import styles from "./AuthLoginLogo.module.scss";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

function AuthLoginLogo() {
  const { t } = useTranslation();

  return (
    <div className={styles.logoWrapper}>
      <Flex align="center" justify="center">
        <img src="/logo.svg" alt="logo" />
      </Flex>
      <h1 className={styles.title}>{t("Sign in to your account")}</h1>
      <p className={styles.desc}>{t("Start your demo version")}</p>
    </div>
  );
}

export default memo(AuthLoginLogo);
