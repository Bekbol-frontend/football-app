import { memo } from "react";
import { SwitchLang } from "@/shared/ui/SwitchLang";
import { Button, Flex, Layout } from "antd";
import styles from "./HeaderNav.module.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

interface IProps {
  toggleCollapsed: () => void;
  collapsed: boolean;
}

function HeaderNav({ collapsed, toggleCollapsed }: IProps) {
  return (
    <Header className={styles.header}>
      <Flex align="center" justify="space-between" flex={1}>
        <Button
          type="primary"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
        />

        <Flex>
          <SwitchLang />
        </Flex>
      </Flex>
    </Header>
  );
}

export default memo(HeaderNav);
