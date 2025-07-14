import { memo } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Flex, Typography } from "antd";
import Eng from "@/shared/assets/icon-lang/eng.svg";
import Ru from "@/shared/assets/icon-lang/russ.svg";
import Kk from "@/shared/assets/icon-lang/kk.svg";
import Uz from "@/shared/assets/icon-lang/uzb.svg";
import styles from "./SwitchLang.module.scss";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const items: MenuProps["items"] = [
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Eng} alt="English" className={styles.img} />
        <Text>English</Text>
      </Flex>
    ),
    key: "en",
  },
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Ru} alt="Русский" className={styles.img} />
        <Text>Русский</Text>
      </Flex>
    ),
    key: "ru",
  },
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Kk} alt="Qaraqalpaq" className={styles.img} />
        <Text>Qaraqalpaq</Text>
      </Flex>
    ),
    key: "kk",
  },
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Kk} alt="Қарақалпакша" className={styles.img} />
        <Text>Қарақалпақ</Text>
      </Flex>
    ),
    key: "kk_k",
  },
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Uz} alt="O’zbek" className={styles.img} />
        <Text>O’zbek</Text>
      </Flex>
    ),
    key: "uz",
  },
  {
    label: (
      <Flex align="center" gap={8}>
        <img src={Uz} alt="Өзбек" className={styles.img} />
        <Text>Өзбек</Text>
      </Flex>
    ),
    key: "uz_k",
  },
];

const objLang = {
  en: {
    text: "English",
    img: Eng,
  },
  ru: {
    text: "Русский",
    img: Ru,
  },
  kk: {
    text: "Qaraqalpaq",
    img: Kk,
  },
  kk_k: {
    text: "Қарақалпақ",
    img: Kk,
  },
  uz: {
    text: "O’zbek",
    img: Uz,
  },
  uz_k: {
    text: "Өзбек",
    img: Uz,
  },
};

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
