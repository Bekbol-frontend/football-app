import { memo, Suspense, useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { HeaderNav } from "@/widgets/HeaderNav";
import { Sidebar } from "@/widgets/Sidebar";
import { PageLoading } from "@/widgets/PageLoading";

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
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default memo(RootLayout);
