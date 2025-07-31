import { memo } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Flex, Typography } from "antd";
import styles from "./SwitchLang.module.scss";
import { useTranslation } from "react-i18next";
import { objLang } from "../model/items";

const { Text } = Typography;

const items: MenuProps["items"] = Object.values(objLang).map((el) => ({
  label: (
    <Flex align="center" gap={8}>
      <img src={el.img} alt="English" className={styles.img} />
      <Text>{el.text}</Text>
    </Flex>
  ),
  key: el.key,
}));

function SwitchLang() {
  const { i18n } = useTranslation();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()} className={styles.wrapDropdown}>
        <Flex align="center" gap={10}>
          <Flex align="center" gap={10}>
            <img
              src={objLang[i18n.language as keyof typeof objLang].img}
              alt="eng"
              className={styles.img}
            />
            <Text className={styles.dropText}>
              {objLang[i18n.language as keyof typeof objLang].text}
            </Text>
          </Flex>

          <DownOutlined
            style={{
              fontSize: 13,
            }}
          />
        </Flex>
      </a>
    </Dropdown>
  );
}

export default memo(SwitchLang);
