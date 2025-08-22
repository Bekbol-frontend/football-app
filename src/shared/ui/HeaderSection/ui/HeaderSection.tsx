import { memo, useCallback } from "react";
import { Flex, Typography, Button } from "antd";
import styles from "./HeaderSection.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { clsx } from "@/shared/lib/clsx";

const { Title } = Typography;

interface IProps {
  title: string;
  path: string;
  className?: string;
}

function HeaderSection(props: IProps) {
  const { title, path, className = "" } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onChangePage = useCallback(() => {
    navigate(path);
  }, [navigate]);

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={20}
      className={clsx([styles.headerSection, className])}
    >
      <Title level={2} className={styles.title}>
        {title}
      </Title>
      <Button type="primary" icon={<PlusOutlined />} onClick={onChangePage}>
        {t("Create")}
      </Button>
    </Flex>
  );
}

export default memo(HeaderSection);
