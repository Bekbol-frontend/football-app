import { memo } from "react";
import { SwitchLang } from "@/shared/ui/SwitchLang";
import { Button, Flex, Layout } from "antd";
import styles from "./HeaderNav.module.scss";

const { Header } = Layout;

function HeaderNav() {
  return (
    <Header className={styles.header}>
      <Flex align="center" justify="space-between" flex={1}>
        <Button>toggle</Button>

        <Flex>
          <SwitchLang />
        </Flex>
      </Flex>
    </Header>
  );
}

export default memo(HeaderNav);
