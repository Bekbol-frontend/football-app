import { memo, useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { HeaderNav } from "@/widgets/HeaderNav";
import { Sidebar } from "@/widgets/Sidebar";

const { Content } = Layout;

function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <Layout hasSider>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderNav toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default memo(RootLayout);
