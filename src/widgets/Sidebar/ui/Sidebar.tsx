import { memo } from "react";
import { Layout } from "antd";
import styles from "./Sidebar.module.scss";
import { LogoLink } from "@/shared/ui/LogoLink";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

interface IProps {
  collapsed: boolean;
}

function Sidebar({ collapsed }: IProps) {
  return (
    <Sider
      style={siderStyle}
      className={styles.sidebar}
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <LogoLink />
      <SidebarMenu />
    </Sider>
  );
}

export default memo(Sidebar);
